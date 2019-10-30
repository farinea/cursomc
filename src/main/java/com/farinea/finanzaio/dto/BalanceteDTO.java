package com.farinea.finanzaio.dto;

import java.io.Serializable;

public class BalanceteDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private String categoriaNome;
	private String tipoConta;
	private Integer ano;
	private Integer mes;
	private Double  total;
	
	public BalanceteDTO() {
	}

	public BalanceteDTO(String categoriaNome, String tipoConta, Integer ano, Integer mes, Double total) {
		this.categoriaNome = categoriaNome;
		this.tipoConta = tipoConta;
		this.ano = ano;
		this.mes = mes;
		this.total = total;
	}

	public String getTipoConta() {
		return tipoConta;
	}

	public void setTipoConta(String tipoConta) {
		this.tipoConta = tipoConta;
	}

	public String getCategoriaNome() {
		return categoriaNome;
	}

	public void setCategoriaNome(String categoriaNome) {
		this.categoriaNome = categoriaNome;
	}

	public Integer getAno() {
		return ano;
	}

	public void setAno(Integer ano) {
		this.ano = ano;
	}

	public Integer getMes() {
		return mes;
	}

	public void setMes(Integer mes) {
		this.mes = mes;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}
	
}
