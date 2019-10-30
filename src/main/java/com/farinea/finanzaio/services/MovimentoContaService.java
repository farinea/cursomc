package com.farinea.finanzaio.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.farinea.finanzaio.dto.MovimentosDTO;
import com.farinea.finanzaio.dto.SaldosDTO;
import com.farinea.finanzaio.interfaces.BalanceteProjection;
import com.farinea.finanzaio.interfaces.ComposicaoSaldoProjection;
import com.farinea.finanzaio.interfaces.SaldosProjection;
import com.farinea.finanzaio.repositories.MovimentoContaRepository;

@Service
public class MovimentoContaService {

	@Autowired
	private MovimentoContaRepository repo;
								
	public List<MovimentosDTO> findMovimentos(Integer conta) {
		//UserSS user = UserService.authenticated();
		//if (user == null) {
	//		throw new AuthorizationException("Acesso negado");
		//}
		return repo.findMovimentos(conta);
	}

	public List<SaldosProjection> findSaldos(Date data, Integer tipo) {
		//UserSS user = UserService.authenticated();
		//if (user == null) {
	//		throw new AuthorizationException("Acesso negado");
		//}
		return repo.findSaldos(data, tipo);
	}

	public List<ComposicaoSaldoProjection> findComposicaoSaldos(Date data) {
		//UserSS user = UserService.authenticated();
		//if (user == null) {
	//		throw new AuthorizationException("Acesso negado");
		//}
		
		return repo.findComposicaoSaldos(data);
	}
	
	public List<BalanceteProjection> findBalancete(Integer ano) {
		//UserSS user = UserService.authenticated();
		//if (user == null) {
	//		throw new AuthorizationException("Acesso negado");
		//}
		
		return repo.findBalancete(ano);
	}

	public SaldosDTO findSaldoByConta(Integer conta, Date data) {
		//UserSS user = UserService.authenticated();
		//if (user == null) {
	//		throw new AuthorizationException("Acesso negado");
		//}
		return repo.findSaldoByConta(conta, data);
	}
}
