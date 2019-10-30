package com.farinea.finanzaio.domain;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Movimento implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="America/Sao_Paulo")
	private Date data;
	
	private String historico;
	
	@JsonManagedReference
	@OneToMany(fetch = FetchType.LAZY, mappedBy="movimento")
	@OrderBy("id ASC")
	private Set<MovimentoConta> contas = new HashSet<>();
	
	public Movimento() {
		
	}

	public Movimento(Integer id, Date data, String historico) {
		super();
		this.id = id;
		this.data = data;
		this.historico = historico;
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

	public Set<MovimentoConta> getContas() {
		return contas;
	}

	public void setContas(Set<MovimentoConta> contas) {
		this.contas = contas;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Movimento other = (Movimento) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

		StringBuilder builder = new StringBuilder();
		builder.append("ID: ");
		builder.append(getId());
		builder.append(", Data: ");
		builder.append(sdf.format(getData()));
		builder.append(", Historico: ");
		builder.append(getHistorico());
		
		return builder.toString();
	}

}

