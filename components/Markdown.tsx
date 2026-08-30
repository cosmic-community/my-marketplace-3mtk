import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: false })

// Content comes from this project's own Cosmic bucket, so it is trusted input.
export default function Markdown({ content }: { content: string }) {
  const html = marked.parse(content ?? '') as string

  return (
    <div
      className="prose-cosmic"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
