"use client"

import * as React from "react"

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
	type?: "single" | "multiple"
	collapsible?: boolean
}

export function Accordion({ children, className }: AccordionProps) {
	return <div className={className}>{children}</div>
}

type AccordionItemProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement> & {
	value?: string
}

export function AccordionItem({ children, className, ...props }: AccordionItemProps) {
	return (
		<details className={className} {...props}>
			{children}
		</details>
	)
}

export function AccordionTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
	return (
		<summary className={className} {...props}>
			{children}
		</summary>
	)
}

export function AccordionContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={className} {...props}>
			{children}
		</div>
	)
}


