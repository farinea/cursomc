package com.farinea.cursomc.services;

import org.springframework.mail.SimpleMailMessage;

import com.farinea.cursomc.domain.Pedido;

public interface EmailService {

	void sendOrderConfirmationEmail(Pedido obj);
	
	void sendEmail(SimpleMailMessage msg);
}
