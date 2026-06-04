import { ThemedImage } from '@techstartups/ui'
import { ImageBlock } from '@/components/blog/ImageBlock'
import { AnchorLink } from '@/components/AnchorLink'
import { GetEarlyAccessButton } from '@/components/GetEarlyAccessButton'

type HtmlProps<Tag extends keyof React.JSX.IntrinsicElements> = React.ComponentPropsWithoutRef<Tag>

/**
 * Returns the MDX component map used to render blog posts — branded HTML elements plus
 * any overrides the caller passes for per-post customization.
 */
export function getMdxComponents(overrides?: Record<string, React.ComponentType>) {
  return {
    a: ({ href, children }: HtmlProps<'a'>) => (
      <AnchorLink
        href={href ?? '#'}
        className="text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {children}
      </AnchorLink>
    ),

    table: ({ children }: HtmlProps<'table'>) => (
      <div className="my-8 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }: HtmlProps<'thead'>) => <thead className="bg-muted">{children}</thead>,
    th: ({ children }: HtmlProps<'th'>) => (
      <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
        {children}
      </th>
    ),
    td: ({ children }: HtmlProps<'td'>) => (
      <td className="border-b border-border px-4 py-3 text-muted-foreground group-last:border-b-0">
        {children}
      </td>
    ),
    tr: ({ children }: HtmlProps<'tr'>) => (
      <tr className="group transition-colors hover:bg-muted/50">{children}</tr>
    ),

    blockquote: ({ children }: HtmlProps<'blockquote'>) => (
      <blockquote className="my-8 border-l-4 border-primary pl-6 text-muted-foreground italic">
        {children}
      </blockquote>
    ),

    ul: ({ children }: HtmlProps<'ul'>) => (
      <ul className="my-4 space-y-2 pl-6 [list-style:disc] marker:text-primary">{children}</ul>
    ),
    li: ({ children }: HtmlProps<'li'>) => <li className="leading-relaxed">{children}</li>,

    p: ({ children }: HtmlProps<'p'>) => <p className="my-4 leading-relaxed">{children}</p>,

    h2: ({ children }: HtmlProps<'h2'>) => (
      <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight md:text-3xl">{children}</h2>
    ),
    h3: ({ children }: HtmlProps<'h3'>) => (
      <h3 className="mt-8 mb-3 text-xl font-bold tracking-tight">{children}</h3>
    ),

    hr: () => <hr className="my-8 border-border" />,

    strong: ({ children }: HtmlProps<'strong'>) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: HtmlProps<'em'>) => <em className="italic">{children}</em>,

    ThemedImage,
    ImageBlock,
    GetEarlyAccessButton,

    ...overrides,
  }
}
