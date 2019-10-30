package com.farinea.finanzaio.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonTypeName;

@Entity
@JsonTypeName("movimentoConta")
public class MovimentoConta implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="movimento_id")
	private Movimento movimento;

	@ManyToOne
	@JoinColumn(name="conta_id")
	private Categoria conta;
	
	private Double  valor;

	public MovimentoConta() {
	}

	public MovimentoConta(Integer id, Movimento movimento, Categoria conta, Double valor) {
		this.id = id;
		this.movimento = movimento;
		this.conta = conta;
		this.valor = valor;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Movimento getMovimento() {
		return movimento;
	}

	public void setMovimento(Movimento movimento) {
		this.movimento = movimento;
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
