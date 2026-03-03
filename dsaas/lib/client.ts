import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const ROOT_EMAIL = "ara.t.howard@gmail.com"

export function die(msg: string): never {
  process.stderr.write(`dsaas: ${msg}\n`)
  process.exit(1)
}

export function ok(msg: string): void {
  process.stdout.write(`${msg}\n`)
}

export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  if (!url || !key) {
    die("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (check .env.local)")
  }
  return createClient(url, key)
}

export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY || ""
  if (!key) {
    die("RESEND_API_KEY must be set (check .env.local)")
  }
  return new Resend(key)
}

export async function getRootUserId(): Promise<string> {
  const client = getAdminClient()
  const { data } = await client.auth.admin.listUsers({ page: 1, perPage: 1000 })
  const root = data?.users?.find((u) => u.email === ROOT_EMAIL)
  if (!root) {
    die(`root user ${ROOT_EMAIL} not found`)
  }
  return root.id
}

export function emailTemplate(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#e5e5e5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="font-size:14px;font-weight:600;color:#dc2626;margin-bottom:24px;">destroysaas</div>
    <div style="font-size:18px;font-weight:600;margin-bottom:16px;color:#fff;">${title}</div>
    <div style="font-size:14px;line-height:1.6;color:#d4d4d4;">
      ${bodyHtml}
    </div>
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid #262626;font-size:12px;color:#737373;">
      <a href="https://destroysaas.coop/dashboard" style="color:#737373;">Manage your account</a>
    </div>
  </div>
</body>
</html>`
}

export const FROM = "destroysaas <ara@destroysaas.coop>"
export const REPLY_TO = "ara@destroysaas.coop"

// simple arg parser: returns { flags: {key: value}, positional: string[] }
export function parseArgs(argv: string[]): { flags: Record<string, string>, positional: string[] } {
  const flags: Record<string, string> = {}
  const positional: string[] = []
  let i = 0
  while (i < argv.length) {
    const arg = argv[i]
    if (arg.startsWith("--") && i + 1 < argv.length && !argv[i + 1].startsWith("--")) {
      flags[arg.slice(2)] = argv[i + 1]
      i += 2
    } else if (arg.startsWith("--")) {
      flags[arg.slice(2)] = "true"
      i++
    } else {
      positional.push(arg)
      i++
    }
  }
  return { flags, positional }
}
