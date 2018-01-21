package io.bilge.repository;

import io.bilge.domain.DataColumn;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DataColumn entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DataColumnRepository extends JpaRepository<DataColumn, Long> {

}
