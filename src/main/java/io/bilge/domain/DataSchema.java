package io.bilge.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DataSchema.
 */
@Entity
@Table(name = "data_schema")
public class DataSchema implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "table_count")
    private Long tableCount;

    @OneToMany(mappedBy = "schema")
    @JsonIgnore
    private Set<DataTable> tables = new HashSet<>();

    @ManyToOne
    private DataContext dataContext;

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

    public DataSchema name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTableCount() {
        return tableCount;
    }

    public DataSchema tableCount(Long tableCount) {
        this.tableCount = tableCount;
        return this;
    }

    public void setTableCount(Long tableCount) {
        this.tableCount = tableCount;
    }

    public Set<DataTable> getTables() {
        return tables;
    }

    public DataSchema tables(Set<DataTable> dataTables) {
        this.tables = dataTables;
        return this;
    }

    public DataSchema addTables(DataTable dataTable) {
        this.tables.add(dataTable);
        dataTable.setSchema(this);
        return this;
    }

    public DataSchema removeTables(DataTable dataTable) {
        this.tables.remove(dataTable);
        dataTable.setSchema(null);
        return this;
    }

    public void setTables(Set<DataTable> dataTables) {
        this.tables = dataTables;
    }

    public DataContext getDataContext() {
        return dataContext;
    }

    public DataSchema dataContext(DataContext dataContext) {
        this.dataContext = dataContext;
        return this;
    }

    public void setDataContext(DataContext dataContext) {
        this.dataContext = dataContext;
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
        DataSchema dataSchema = (DataSchema) o;
        if (dataSchema.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataSchema.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataSchema{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", tableCount=" + getTableCount() +
            "}";
    }
}
