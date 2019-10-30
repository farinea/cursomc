package com.farinea.finanzaio.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.farinea.finanzaio.domain.Movimento;
import com.farinea.finanzaio.domain.MovimentoConta;
import com.farinea.finanzaio.repositories.MovimentoContaRepository;
import com.farinea.finanzaio.repositories.MovimentoRepository;
import com.farinea.finanzaio.security.UserSS;
import com.farinea.finanzaio.services.exceptions.AuthorizationException;
import com.farinea.finanzaio.services.exceptions.ObjectNotFoundException;

@Service
public class MovimentoService {

	@Autowired
	private MovimentoRepository repo;
			
	@Autowired
	private MovimentoContaRepository movimentoContaRepository;
			
	// @Autowired
	// private EmailService emailService;

	public Movimento find(Integer id) {
		Optional<Movimento> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + MovimentoService.class.getName()));
	}
	
	@Transactional
	public Movimento insert(Movimento obj) {
		obj.setId(null);
		obj = repo.save(obj);

		System.out.println(obj);

		for (MovimentoConta contas : obj.getContas()) {
			contas.setMovimento(obj);
		}
		
		movimentoContaRepository.saveAll(obj.getContas());

		//emailService.sendOrderConfirmationHtmlEmail(obj);
		return obj;
	}
	
	public Page<Movimento> findPage(Integer page, Integer linesPerPage, String orderBy, String direction) {
		UserSS user = UserService.authenticated();
		if (user == null) {
			throw new AuthorizationException("Acesso negado");
		}
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return repo.findAll(pageRequest);
	}
}
