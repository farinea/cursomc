package com.farinea.finanzaio.domain.enums;

public enum TipoConta {

	CONTA_CORRENTE(1, "Conta Corrente"),
	CONTA_INVESTIMENTO(2, "Investimento"),
	CONTA_IMOBILIZADO(3, "Imobilizado"),
	CONTA_RECEITA(4, "Receita"),
	CONTA_DESPESA(5, "Despesa");
	
	private int cod;
	private String descricao;
	
	private TipoConta(int cod, String descricao ) {
		this.cod = cod;
		this.descricao = descricao;
	}

	public int getCod() {
		return cod;
	}

	public String getDescricao() {
		return descricao;
	}
	
	public static TipoConta toEnum(Integer cod) {
		if (cod == null) {
			return null;
		}
		
		for (TipoConta x : TipoConta.values()) {
			if (cod.equals(x.getCod())) {
				return x;
			}
		}
		
		throw new IllegalArgumentException("Id inválido: " + cod);
	}
}