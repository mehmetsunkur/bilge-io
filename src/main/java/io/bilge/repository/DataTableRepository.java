package io.bilge.repository;

import io.bilge.domain.DataTable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DataTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DataTableRepository extends JpaRepository<DataTable, Long> {

}
