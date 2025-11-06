export function makeEmailValidatorTemplate(
  userName: string,
  url: string,
): string {
  return `
  <!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verificação de E-mail</title>
    <style>
      body {
        font-family: 'Segoe UI', Arial, sans-serif;
        background-color: #f4f4f7;
        color: #333333;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        background-color: #f4f4f7;
        padding: 40px 0;
      }
      .email-wrapper {
        max-width: 600px;
        background-color: #ffffff;
        margin: 0 auto;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        overflow: hidden;
      }
      .header {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        text-align: center;
        padding: 24px;
        font-size: 20px;
        font-weight: bold;
      }
      .content {
        padding: 32px;
        text-align: center;
      }
      .content h1 {
        color: #333;
        font-size: 22px;
      }
      .content p {
        color: #555;
        font-size: 16px;
        line-height: 1.5;
      }
      .button {
        display: inline-block;
        background-color: #667eea;
        color: white;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 6px;
        margin-top: 24px;
        font-weight: 600;
        transition: background 0.3s;
      }
      .button:hover {
        background-color: #5a67d8;
      }
      .footer {
        text-align: center;
        color: #999;
        font-size: 13px;
        padding: 24px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="email-wrapper">
        <div class="header">
          Verifique seu e-mail
        </div>
        <div class="content">
          <h1>Olá, ${userName} 👋</h1>
          <p>
            Obrigado por se cadastrar! Antes de começar, precisamos confirmar seu endereço de e-mail.
          </p>
          <p>
            Clique no botão abaixo para verificar seu e-mail:
          </p>
          <a href="${url}" class="button">Verificar e-mail</a>
          <p style="margin-top: 32px; font-size: 14px; color: #888;">
            Se você não criou uma conta, pode ignorar este e-mail.
          </p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} PiggyBudget — Todos os direitos reservados.
        </div>
      </div>
    </div>
  </body>
</html>`;
}
