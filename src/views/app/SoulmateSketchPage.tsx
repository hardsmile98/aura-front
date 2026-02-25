import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTranslations } from "@/lib/translations";
import { toLocale } from "@/lib/i18n";
import { LocaleLink } from "@/components/shared";
import { useGetProfileQuery, useGetSketchQuery } from "@/lib/api/userApi";
import { SOULMATE_SECTION_KEYS, SOULMATE_SECTION_GROUPS } from "@/lib/api/types/getSketch";

type SketchLoaderProps = {
  loadingText: string;
  hintText: string;
};

type SketchErrorProps = {
  title: string;
  hint: string;
};

function SketchError({ title, hint }: SketchErrorProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
        <span className="text-2xl">⚠</span>
      </div>
      <p className="text-red-600 font-medium mb-2">{title}</p>
      <p className="text-zinc-500 text-sm">{hint}</p>
    </div>
  );
}

function SketchLoader({ loadingText, hintText }: SketchLoaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="text-2xl animate-horoscope-star"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            ♥
          </span>
        ))}
      </div>
      <p className="text-violet-600 font-medium text-center">{loadingText}</p>
      <p className="text-zinc-500 text-sm">{hintText}</p>
    </div>
  );
}

const POLL_INTERVAL_MS = 10_000;

export function SoulmateSketchPage() {
  const { locale: localeParam } = useParams<{ locale: string }>();

  const locale = toLocale(localeParam);

  const t = getTranslations(locale).account;

  const [shouldPoll, setShouldPoll] = useState(false);

  const {
    data: sketchData,
    isLoading: isSketchLoading,
    isError: isSketchError,
  } = useGetSketchQuery(
    { type: "soulmate", locale },
    { pollingInterval: shouldPoll ? POLL_INTERVAL_MS : 0 },
  );

  const reportStatus = sketchData?.status;

  useEffect(() => {
    if (reportStatus === 'pending') {
      setShouldPoll(true);
    } else {
      setShouldPoll(false);
    }
  }, [reportStatus]);

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetProfileQuery();

  const quizResult = profile?.quizResult;

  const sketch =
    sketchData?.status === "completed" ? sketchData.sketch : undefined;

  const gender = quizResult?.interest;

  const sketchIndex = ((profile?.id ?? 0) % 4) + 1;

  const sketchImage =
    gender === "men"
      ? `/sketchs/sketch-man-${sketchIndex}.jpg`
      : `/sketchs/sketch-woman-${sketchIndex}.jpg`;

  const isLoading =
    isSketchLoading || isProfileLoading || sketchData?.status === "pending";

  const isError =
    isProfileError ||
    isSketchError ||
    sketchData?.status === "failed";

  return (
    <div className="w-full">
      <LocaleLink
        locale={locale}
        to={`/${locale}/app/insights`}
        className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 mb-6"
      >
        ← {t.insights}
      </LocaleLink>

      {isLoading ? (
        <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-10 shadow-sm border border-zinc-100">
          <SketchLoader
            loadingText={t.soulmateSketchLoading}
            hintText={t.soulmateSketchLoadingHint}
          />
        </div>
      ) : isError ? (
        <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-10 shadow-sm border border-zinc-100">
          <SketchError
            title={t.soulmateSketchError}
            hint={
              sketchData?.status === "failed" && sketchData.error
                ? sketchData.error
                : t.soulmateSketchErrorHint
            }
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {SOULMATE_SECTION_GROUPS.map((groupKeys, groupIndex) => {
            const sectionsInGroup = groupKeys
              .map((key) => ({
                key,
                text: sketch?.[key]?.trim(),
                title: t.soulmateSketchSections[key],
              }))
              .filter((s) => s.text);

            if (sectionsInGroup.length === 0) return null;

            const isIntroGroup = groupKeys[0] === "intro";
            const introSection = sectionsInGroup.find((s) => s.key === "intro");

            return (
              <div
                key={groupIndex}
                className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-100"
              >
                {isIntroGroup && introSection ? (
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <div className="flex-shrink-0 w-[192px] h-[240px] overflow-hidden rounded-xl border border-zinc-100 mx-auto md:mx-0">
                      <img
                        src={sketchImage}
                        alt=""
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-col gap-3 min-w-0 flex-1">
                      <h1 className="text-xl md:text-2xl font-bold text-zinc-900">
                        {t.soulmateSketchTitle}
                      </h1>
                      <p className="text-zinc-600 text-sm leading-relaxed whitespace-pre-line">
                        {introSection.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {sectionsInGroup.map(({ key, text, title }) => (
                      <div key={key} className="flex flex-col gap-2 text-left">
                        <h2 className="text-lg font-semibold text-zinc-900">
                          {title}
                        </h2>
                        <p className="text-zinc-600 text-sm leading-relaxed whitespace-pre-line">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                </div>
              );
            })}

          {!sketch ||
            !SOULMATE_SECTION_KEYS.some((key) => sketch[key]?.trim()) ? (
              <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-10 shadow-sm border border-zinc-100">
                <p className="text-zinc-500 text-sm text-center">
                  {t.soulmateSketchPagePlaceholder}
                </p>
              </div>
            ) : null}
        </div>
      )}
    </div>
  );
}
