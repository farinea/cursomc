package com.farinea.finanzaio.dto;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import com.farinea.finanzaio.domain.Categoria;
import com.farinea.finanzaio.domain.enums.TipoConta;

public class CategoriaDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	@NotEmpty(message="Preenchimento obrigatório")
	@Length(min=2, max=80, message="O tamanho deve ser entre 2 e 80 caracteres")
	private String nome;
	
	private Integer tipo;
	
	private Double saldoInicial;
	
	public CategoriaDTO() {
		
	}

	public CategoriaDTO(Categoria obj) {
		id = obj.getId();
		nome = obj.getNome();
		tipo = (obj.getTipoConta()==null) ? null : obj.getTipoConta().getCod();
		saldoInicial = obj.getSaldoInicial();
	}

	public CategoriaDTO(Integer id, String nome, TipoConta tipo, Double saldoInicial) {
		super();
		this.id = id;
		this.nome = nome;
		this.tipo = (tipo==null) ? null : tipo.getCod();
		this.saldoInicial = saldoInicial;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public TipoConta getTipoConta() {
		return TipoConta.toEnum(tipo);
	}

	public void setTipoConta(TipoConta tipo) {
		this.tipo = tipo.getCod();
	}

	public Double getSaldoInicial() {
		return saldoInicial;
	}

	public void setSaldoInicial(Double saldoInicial) {
		this.saldoInicial = saldoInicial;
	}

}
