package com.farinea.finanzaio.dto;

import java.io.Serializable;

import com.farinea.finanzaio.domain.enums.TipoConta;

public class ComposicaoSaldosDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer tipo;
	private Double saldo;
	
	public ComposicaoSaldosDTO() {
	}

	public ComposicaoSaldosDTO(Integer tipo, Double saldo) {
		this.tipo = tipo;
		this.saldo = saldo;
	}

	public TipoConta getTipoConta() {
		return TipoConta.toEnum(tipo);
	}

	public void setTipoConta(TipoConta tipo) {
		this.tipo = tipo.getCod();
	}

	public Double getSaldo() {
		return saldo;
	}

	public void setSaldo(Double saldo) {
		this.saldo = saldo;
	}

}