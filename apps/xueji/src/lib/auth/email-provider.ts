import Email from 'next-auth/providers/nodemailer'
import nodemailer from 'nodemailer'
import type { EmailConfig } from 'next-auth/providers/email'

function html({ url, host, email }: Record<'url' | 'host' | 'email', string>) {
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`
  const escapedHost = `${host.replace(/\./g, '&#8203;.')}`
  const backgroundColor = '#f9f9f9'
  const textColor = '#444444'
  const mainBackgroundColor = '#ffffff'
  const buttonBackgroundColor = '#346df1'
  const buttonBorderColor = '#346df1'
  const buttonTextColor = '#ffffff'

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedHost}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        通过邮箱 <strong>${escapedEmail}</strong> 登录
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">点击登录</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        如果你没有要求这封邮件，你可以安全地忽略它。<br/>
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}

function text({ url, host }: Record<'url' | 'host', string>) {
  return `点击链接登录 ${host}\n${url}\n\n`
}

const emailConfig: EmailConfig = {
  id: 'email',
  type: 'email',
  name: 'Email',
  maxAge: 259200, //3天
  server: process.env.EMAIL_SERVER,
  from: process.env.EMAIL_FROM,
  options: {},
  // 自定义发送邮件
  async sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
    const { host } = new URL(url)
    const transport = nodemailer.createTransport(server)
    console.log('=========', email)
    await transport.sendMail({
      to: email,
      from,
      subject: `点击链接登录 ${host}`,
      text: text({ url, host }),
      html: html({ url, host, email }),
    })
  },
}

export const emailProvider = Email(emailConfig)
