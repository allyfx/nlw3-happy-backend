interface MailConfig {
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
};

export default {
    defaults: {
        from: {
            email: 'equipe@happy.com.br',
            name: 'Equipe Happy',
        }
    }
} as MailConfig