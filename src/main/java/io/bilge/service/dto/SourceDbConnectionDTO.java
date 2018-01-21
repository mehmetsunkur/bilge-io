package io.bilge.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SourceDbConnection entity.
 */
public class SourceDbConnectionDTO implements Serializable {

    private Long id;

    private String name;

    private String url;

    private String user;

    private String pass;

    private String dbType;

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getDbType() {
        return dbType;
    }

    public void setDbType(String dbType) {
        this.dbType = dbType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SourceDbConnectionDTO sourceDbConnectionDTO = (SourceDbConnectionDTO) o;
        if(sourceDbConnectionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sourceDbConnectionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SourceDbConnectionDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", url='" + getUrl() + "'" +
            ", user='" + getUser() + "'" +
            ", pass='" + getPass() + "'" +
            ", dbType='" + getDbType() + "'" +
            "}";
    }
}
