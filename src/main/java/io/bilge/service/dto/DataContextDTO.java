package io.bilge.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the DataContext entity.
 */
public class DataContextDTO implements Serializable {

    private Long id;

    private String name;

    private Long sourceConnectionId;

    private String sourceConnectionName;

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

    public Long getSourceConnectionId() {
        return sourceConnectionId;
    }

    public void setSourceConnectionId(Long sourceDbConnectionId) {
        this.sourceConnectionId = sourceDbConnectionId;
    }

    public String getSourceConnectionName() {
        return sourceConnectionName;
    }

    public void setSourceConnectionName(String sourceDbConnectionName) {
        this.sourceConnectionName = sourceDbConnectionName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DataContextDTO dataContextDTO = (DataContextDTO) o;
        if(dataContextDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataContextDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataContextDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
