package io.bilge.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the DataTable entity.
 */
public class DataTableDTO implements Serializable {

    private Long id;

    private String name;

    private Long columnCount;

    private Long schemaId;

    private String schemaName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getColumnCount() {
        return columnCount;
    }

    public void setColumnCount(Long columnCount) {
        this.columnCount = columnCount;
    }

    public Long getSchemaId() {
        return schemaId;
    }

    public void setSchemaId(Long dataSchemaId) {
        this.schemaId = dataSchemaId;
    }

    public String getSchemaName() {
        return schemaName;
    }

    public void setSchemaName(String dataSchemaName) {
        this.schemaName = dataSchemaName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DataTableDTO dataTableDTO = (DataTableDTO) o;
        if(dataTableDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataTableDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataTableDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", columnCount=" + getColumnCount() +
            "}";
    }
}
