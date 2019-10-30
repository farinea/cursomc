package com.farinea.finanzaio.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.farinea.finanzaio.domain.MovimentoConta;
import com.farinea.finanzaio.dto.MovimentosDTO;
import com.farinea.finanzaio.dto.SaldosDTO;
import com.farinea.finanzaio.interfaces.BalanceteProjection;
import com.farinea.finanzaio.interfaces.ComposicaoSaldoProjection;
import com.farinea.finanzaio.interfaces.SaldosProjection;

@Repository
public interface MovimentoContaRepository extends JpaRepository<MovimentoConta, Integer> {

	@Transactional(readOnly=true)
	@Query("SELECT new com.farinea.finanzaio.dto.MovimentosDTO(obj.data,obj.historico,mc.conta,mc.valor,obj.id) FROM Movimento obj inner join obj.contas mc inner join mc.conta c WHERE obj.id=mc.movimento and c.id = :conta ORDER BY obj.data desc")
	public List<MovimentosDTO> findMovimentos(@Param("conta") Integer conta);

	@Transactional(readOnly=true)
	@Query("SELECT DISTINCT new com.farinea.finanzaio.dto.SaldosDTO(mc.conta,SUM(mc.valor) + c.saldoInicial as saldo) FROM Movimento obj inner join obj.contas mc inner join mc.conta c WHERE obj.id=mc.movimento and c.id = :conta and obj.data <= :data GROUP BY mc.conta")
	public SaldosDTO findSaldoByConta(@Param("conta") Integer conta, @Param("data") Date data);

	//@Transactional(readOnly=true)
	//@Query("SELECT DISTINCT new com.farinea.finanzaio.dto.SaldosDTO(mc.conta,SUM(mc.valor) + c.saldoInicial as saldo) FROM Movimento obj inner join obj.contas mc inner join mc.conta c WHERE obj.id=mc.movimento and c.tipo = 1 and obj.data <= :data GROUP BY mc.conta")
	@Query(nativeQuery = true,value =
			"SELECT categoria,SUM(saldo) as saldo FROM ( " +
			"SELECT c.id as categoria,SUM(mc.valor) as saldo FROM Movimento obj " +
			"		inner join Movimento_Conta mc " +
			"		inner join Categoria c " +
			"		WHERE obj.id=mc.movimento_id and mc.conta_id=c.id and c.tipo = :tipo and obj.data <= :data " +
			"		GROUP BY c.id " +
			" UNION ALL " + 
			"SELECT id as categoria,saldo_inicial as saldo FROM categoria WHERE tipo = :tipo) as TABELA " +
			"GROUP BY categoria " +
			"ORDER BY saldo desc")
	public List<SaldosProjection> findSaldos(@Param("data") Date data, @Param("tipo") Integer tipo);

	@Query(nativeQuery = true,value =
			"SELECT tipo,SUM(saldo) as saldo FROM ( " +
			"SELECT c.tipo,SUM(mc.valor) as saldo FROM Movimento obj " +
			"		inner join Movimento_Conta mc " +
			"		inner join Categoria c " +
			"		WHERE obj.id=mc.movimento_id and mc.conta_id=c.id and c.tipo BETWEEN 1 and 3 and obj.data <= :data " +
			"		GROUP BY c.tipo " +
			" UNION ALL " + 
			"SELECT tipo,saldo_inicial as saldo FROM categoria WHERE tipo between 1 and 3) as TABELA " +
			"GROUP BY tipo")
	public List<ComposicaoSaldoProjection> findComposicaoSaldos(@Param("data") Date data);
	
	@Query(nativeQuery = true,value =
			"SELECT c.nome as categoriaNome,c.tipo as tipoConta, year(obj.data) as ano,month(obj.data) as mes, SUM(mc.valor) as total FROM Movimento obj " +
			"		inner join Movimento_Conta mc " +
			"		inner join Categoria c " +
			"		WHERE obj.id=mc.movimento_id and mc.conta_id=c.id and c.tipo > 3 and year(obj.data) = :ano " +
			"GROUP BY c.nome,year(obj.data),month(obj.data) "+
			"ORDER BY year(obj.data),month(obj.data),total desc")
	public List<BalanceteProjection> findBalancete(@Param("ano") Integer ano);
}
