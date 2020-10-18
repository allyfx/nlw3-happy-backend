import nodemailer, { Transporter } from 'nodemailer';

import MailProvider from '../models/MailProvider';
import SendMailDTO from '../dtos/SendMailDTO';

import MailConfig from '../../../config/mail';

class EtherealMailProvider implements MailProvider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail({ to, from, subject, link }: SendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || MailConfig.defaults.from.name,
                address: from?.email || MailConfig.defaults.from.email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: `
                <h3>Olá ${to.name}</h3>
                <p>Recebemos uma solicitação para redefinição da sua senha.</p>
                <a href="${link}">Aqui está o seu link para redefinir a senha.</a>
                </br>
                </br>
                Atenciosamente,<br/>
                Equipe <strong>Happy</strong>
            `,
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default EtherealMailProvider;