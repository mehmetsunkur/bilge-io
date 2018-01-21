package io.bilge.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DataTable.
 */
@Entity
@Table(name = "data_table")
public class DataTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "column_count")
    private Long columnCount;

    @OneToMany(mappedBy = "table")
    @JsonIgnore
    private Set<DataColumn> columns = new HashSet<>();

    @ManyToOne
    private DataSchema schema;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public DataTable name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getColumnCount() {
        return columnCount;
    }

    public DataTable columnCount(Long columnCount) {
        this.columnCount = columnCount;
        return this;
    }

    public void setColumnCount(Long columnCount) {
        this.columnCount = columnCount;
    }

    public Set<DataColumn> getColumns() {
        return columns;
    }

    public DataTable columns(Set<DataColumn> dataColumns) {
        this.columns = dataColumns;
        return this;
    }

    public DataTable addColumns(DataColumn dataColumn) {
        this.columns.add(dataColumn);
        dataColumn.setTable(this);
        return this;
    }

    public DataTable removeColumns(DataColumn dataColumn) {
        this.columns.remove(dataColumn);
        dataColumn.setTable(null);
        return this;
    }

    public void setColumns(Set<DataColumn> dataColumns) {
        this.columns = dataColumns;
    }

    public DataSchema getSchema() {
        return schema;
    }

    public DataTable schema(DataSchema dataSchema) {
        this.schema = dataSchema;
        return this;
    }

    public void setSchema(DataSchema dataSchema) {
        this.schema = dataSchema;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DataTable dataTable = (DataTable) o;
        if (dataTable.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataTable.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataTable{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", columnCount=" + getColumnCount() +
            "}";
    }
}
