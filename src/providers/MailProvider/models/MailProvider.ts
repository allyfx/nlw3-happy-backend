import SendMailDTO from '../dtos/SendMailDTO';

export default interface MailProvider {
    sendMail(data: SendMailDTO): Promise<void>;
}