package com.farinea.finanzaio.dto;

import java.io.Serializable;
import java.util.Date;

import com.farinea.finanzaio.domain.Categoria;

public class MovimentosDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Date data;
	private String historico;
	private Categoria conta;
	private Double valor;
	private Integer id;
	
	public MovimentosDTO() {
	}

	
	public MovimentosDTO(Date data, String historico, Categoria conta, Double valor, Integer id) {
		this.data = data;
		this.historico = historico;
		this.conta = conta;
		this.valor = valor;
		this.id = id;
	}

	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public String getHistorico() {
		return historico;
	}

	public void setHistorico(String historico) {
		this.historico = historico;
	}

	public Categoria getConta() {
		return conta;
	}

	public void setConta(Categoria conta) {
		this.conta = conta;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}
	
	
}
