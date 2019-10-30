package com.farinea.finanzaio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.farinea.finanzaio.domain.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

	@Transactional(readOnly=true)
	@Query("SELECT obj FROM Categoria obj WHERE obj.tipo = :tipo ORDER BY obj.nome")
	public List<Categoria> findCategorias(@Param("tipo") Integer tipo);

}
