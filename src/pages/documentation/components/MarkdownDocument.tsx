import { Children, cloneElement, Fragment, isValidElement, lazy, Suspense, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { uiContent } from '../../../data/uiContent'
import { createHeadingId, createTextId, splitMarkdown } from '../../../utils/markdown'
import Callout from './Callout'
import './MarkdownDocument.css'

const lineBreakPattern = /<br\s*\/?>/i

const CodeBlock = lazy(() => import('./CodeBlock'))
const MermaidDiagram = lazy(() => import('./MermaidDiagram'))

interface MarkdownDocumentProps {
  source: string
}

function flattenText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(flattenText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return flattenText(node.props.children)
  return ''
}

function createHeadingIdFromChildren(children: ReactNode): string {
  return createHeadingId(flattenText(children))
}

// Raw HTML is not parsed, so an authored <br/> reaches the tree as text. Tables are the one
// place Markdown has no syntax for a line break, which is where the documents use it.
function withLineBreaks(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === 'string') {
      const lines = child.split(lineBreakPattern)
      if (lines.length === 1) return child
      return lines.map((line, index) => (
        <Fragment key={createTextId(`${index}-${line}`)}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children !== undefined) {
      return cloneElement(child, undefined, withLineBreaks(child.props.children))
    }
    return child
  })
}

const markdownComponents: Components = {
  h1: ({ children }) => <h1 id={createHeadingIdFromChildren(children)}>{children}</h1>,
  h2: ({ children }) => <h2 id={createHeadingIdFromChildren(children)}>{children}</h2>,
  h3: ({ children }) => <h3 id={createHeadingIdFromChildren(children)}>{children}</h3>,
  a: ({ children, href }) => (
    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {children}
    </a>
  ),
  p: ({ children }) => <p>{withLineBreaks(children)}</p>,
  li: ({ children }) => <li>{withLineBreaks(children)}</li>,
  th: ({ children, style }) => <th style={style}>{withLineBreaks(children)}</th>,
  td: ({ children, style }) => <td style={style}>{withLineBreaks(children)}</td>,
  pre: ({ children }) => <>{children}</>,
  code: ({ children, className }) => {
    const languageName = className?.replace('language-', '') ?? ''
    const code = String(children).replace(/\n$/, '')

    if (languageName === 'mermaid') {
      return (
        <Suspense fallback={<pre className="markdown-document__code-loading">{uiContent.diagramLoading}</pre>}>
          <MermaidDiagram definition={code} />
        </Suspense>
      )
    }
    if (!className) return <code>{children}</code>
    return (
      <Suspense
        fallback={
          <pre className="markdown-document__code-loading">
            <code>{code}</code>
          </pre>
        }
      >
        <CodeBlock code={code} languageName={languageName} />
      </Suspense>
    )
  },
}

function renderMarkdown(content: string): ReactNode {
  const preparedContent = content.replace(/```([a-zA-Z0-9-]+)\s+title="([^"]+)"/g, '**$2**\n\n```$1')
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {preparedContent}
    </ReactMarkdown>
  )
}

export default function MarkdownDocument({ source }: MarkdownDocumentProps) {
  return (
    <div className="markdown-document">
      {splitMarkdown(source).map((segment, index) => {
        const key = createTextId(`${index}-${segment.content}`)
        if (segment.kind === 'markdown') return <div key={key}>{renderMarkdown(segment.content)}</div>
        return (
          <Callout key={key} kind={segment.kind}>
            {renderMarkdown(segment.content)}
          </Callout>
        )
      })}
    </div>
  )
}
