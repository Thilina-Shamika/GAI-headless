"use client"

import { Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"

export type TopBarProps = {
	workingHours?: string
	email?: string
	socials?: Array<{ label?: string; href?: string; icon?: string }>
}

const bgColor = "#273378"

function SocialIcon({ name }: { name?: string }) {
	const key = (name || "").toLowerCase()
	if (key.includes("tiktok") || key.includes("tik")) return <span className="text-[10px]">TT</span>
	if (key.includes("face")) return <Facebook className="h-4 w-4" />
	if (key.includes("insta")) return <Instagram className="h-4 w-4" />
	if (key.includes("x") || key.includes("twit")) return <Twitter className="h-4 w-4" />
	return <span className="inline-block h-4 w-4 rounded-full bg-white/70" />
}

export default function TopBar({ workingHours, email, socials = [] }: TopBarProps) {
	const mailHref = email // already normalized upstream (may include mailto:)
	const mailLabel = typeof email === 'string' ? email.replace(/^mailto:/i, '') : undefined
	return (
		<div style={{ backgroundColor: bgColor }} className="text-white text-xs">
			<div className="mx-auto max-w-6xl px-4">
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 items-center font-[poppins,ui-sans-serif]">
					<div className="flex items-center gap-2">
						<Clock className="h-4 w-4" />
						<span>{workingHours || "Mon–Fri 9:00–17:00"}</span>
					</div>
					<div className="flex items-center gap-2">
						<Mail className="h-4 w-4" />
						{mailHref ? (
							<a href={mailHref} className="underline-offset-2 hover:underline">
								{mailLabel}
							</a>
						) : (
							<span>hello@example.com</span>
						)}
					</div>
					<div className="hidden sm:block" />
					<div className="flex items-center justify-end gap-3">
						{socials.length ? (
							socials.map((s, i) => (
								<a
									key={`${s.href}-${i}`}
									href={s.href || "#"}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={s.label}
									className="opacity-90 hover:opacity-100"
								>
									<SocialIcon name={s.icon || s.label} />
								</a>
							))
						) : (
							<div className="flex items-center gap-3 opacity-80">
								<Facebook className="h-4 w-4" />
								<Instagram className="h-4 w-4" />
								<Twitter className="h-4 w-4" />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
