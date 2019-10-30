package com.farinea.finanzaio.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.farinea.finanzaio.domain.Movimento;

@Repository
public interface MovimentoRepository extends JpaRepository<Movimento, Integer> {

	@Transactional(readOnly=true)
	Page<Movimento> findByHistorico(String historico, Pageable pageRequest);
}
