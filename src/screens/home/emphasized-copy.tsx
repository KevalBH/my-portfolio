import { NAMED_SKILL } from "@/lib/content";

const namedSkillPattern = new RegExp(`(${NAMED_SKILL})`);

interface Props {
  text: string;
}

export function EmphasizedCopy({ text }: Props) {
  const parts = text.split(namedSkillPattern);

  return (
    <>
      {parts.map((part, index) =>
        part === NAMED_SKILL ? (
          <strong key={`${part}-${index}`} className="text-ink font-semibold">
            {NAMED_SKILL}
          </strong>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}
