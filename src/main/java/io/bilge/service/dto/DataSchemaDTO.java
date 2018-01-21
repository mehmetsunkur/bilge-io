package io.bilge.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the DataSchema entity.
 */
public class DataSchemaDTO implements Serializable {

    private Long id;

    private String name;

    private Long tableCount;

    private Long dataContextId;

    private String dataContextName;

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

    public Long getTableCount() {
        return tableCount;
    }

    public void setTableCount(Long tableCount) {
        this.tableCount = tableCount;
    }

    public Long getDataContextId() {
        return dataContextId;
    }

    public void setDataContextId(Long dataContextId) {
        this.dataContextId = dataContextId;
    }

    public String getDataContextName() {
        return dataContextName;
    }

    public void setDataContextName(String dataContextName) {
        this.dataContextName = dataContextName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DataSchemaDTO dataSchemaDTO = (DataSchemaDTO) o;
        if(dataSchemaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataSchemaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataSchemaDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", tableCount=" + getTableCount() +
            "}";
    }
}
