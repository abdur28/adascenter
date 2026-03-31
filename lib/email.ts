import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function buildHtml(title: string, body: string): string {
  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5; padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background-color:#0d1117; padding:28px 40px; text-align:center;">
              <h1 style="margin:0; font-size:20px; font-weight:700; letter-spacing:0.08em;">
                <span style="color:#00D4AA;">ADAS</span>
                <span style="color:#E0E0E0;"> ЦЕНТР</span>
              </h1>
              <p style="margin:4px 0 0; font-size:11px; color:#888; letter-spacing:0.1em;">
                ВЫЕЗДНАЯ КАЛИБРОВКА
              </p>
            </td>
          </tr>

          <!-- Accent line -->
          <tr>
            <td style="height:3px; background:linear-gradient(90deg, #00D4AA, #0080FF);"></td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 40px 0;">
              <h2 style="margin:0; font-size:18px; font-weight:600; color:#1a1a2e;">
                ${title}
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:16px 40px 32px; font-size:14px; line-height:1.7; color:#555;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px; background-color:#fafafa; border-top:1px solid #eee; text-align:center;">
              <p style="margin:0; font-size:11px; color:#999;">
                ADAS ЦЕНТР — Москва и Московская область
              </p>
              <p style="margin:4px 0 0; font-size:11px; color:#999;">
                adasrus@mail.ru
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendContactFormEmail(data: {
  name: string;
  phone: string;
  car?: string;
  message?: string;
}): Promise<boolean> {
  const body = `
    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
      <tr style="border-bottom:1px solid #eee;">
        <td style="font-weight:600; color:#1a1a2e; width:140px;">Имя</td>
        <td style="color:#555;">${data.name}</td>
      </tr>
      <tr style="border-bottom:1px solid #eee;">
        <td style="font-weight:600; color:#1a1a2e;">Телефон</td>
        <td style="color:#555;"><a href="tel:${data.phone}" style="color:#0080FF; text-decoration:none;">${data.phone}</a></td>
      </tr>
      ${data.car ? `<tr style="border-bottom:1px solid #eee;">
        <td style="font-weight:600; color:#1a1a2e;">Автомобиль</td>
        <td style="color:#555;">${data.car}</td>
      </tr>` : ""}
    </table>

    ${data.message ? `
    <div style="margin-top:20px; padding:16px; background-color:#f0fdf9; border-radius:8px; border-left:3px solid #00D4AA;">
      <p style="margin:0 0 8px; font-weight:600; color:#1a1a2e; font-size:13px;">Сообщение</p>
      <p style="margin:0; color:#555; white-space:pre-wrap;">${data.message}</p>
    </div>` : ""}

    <p style="margin-top:20px; font-size:12px; color:#aaa; font-style:italic;">
      Заявка отправлена с сайта ADAS ЦЕНТР
    </p>
  `;

  try {
    await transporter.sendMail({
      from: `"ADAS ЦЕНТР" <${process.env.EMAIL_USER}>`,
      to: "adasrus@mail.ru",
      subject: `Новая заявка от ${data.name}`,
      html: buildHtml("Новая заявка с сайта", body),
    });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
