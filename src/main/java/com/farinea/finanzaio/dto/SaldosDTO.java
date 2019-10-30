package com.farinea.finanzaio.dto;

import java.io.Serializable;

import com.farinea.finanzaio.domain.Categoria;

public class SaldosDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Categoria conta;
	private Double saldo;

	public SaldosDTO() {
	}

	public SaldosDTO(Categoria conta, Double saldo) {
		this.conta = conta;
		this.saldo = saldo;
	}

	public Categoria getConta() {
		return conta;
	}

	public void setConta(Categoria conta) {
		this.conta = conta;
	}

	public Double getSaldo() {
		return saldo;
	}

	public void setSaldo(Double saldo) {
		this.saldo = saldo;
	}

	
}
