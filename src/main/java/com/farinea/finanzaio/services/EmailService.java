package com.farinea.finanzaio.services;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.SimpleMailMessage;

import com.farinea.finanzaio.domain.Cliente;
import com.farinea.finanzaio.domain.Movimento;

public interface EmailService {

	void sendOrderConfirmationEmail(Movimento obj);
	
	void sendEmail(SimpleMailMessage msg);

	void sendOrderConfirmationHtmlEmail(Movimento obj);
	
	void sendHtmlEmail(MimeMessage msg);
	
	void sendNewPasswordEmail(Cliente cliente, String newPass);

}
