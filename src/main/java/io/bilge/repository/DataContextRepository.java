package io.bilge.repository;

import io.bilge.domain.DataContext;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DataContext entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DataContextRepository extends JpaRepository<DataContext, Long> {

}
