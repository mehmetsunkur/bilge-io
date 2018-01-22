package io.bilge.base.service.metamodel;

import io.bilge.service.dto.SourceDbConnectionDTO;
import org.apache.metamodel.DataContext;
import org.apache.metamodel.factory.DataContextProperties;
import org.apache.metamodel.factory.DataContextPropertiesImpl;
import org.apache.metamodel.jdbc.JdbcDataContextFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by mehmet on 1/21/18.
 */
@Service
public class BilgeJdbcDataContextFactoryService extends JdbcDataContextFactory {

    public DataContext create(SourceDbConnectionDTO sourceDbConnection){
        Map<String, Object> props = new HashMap<>();

        props.put(DataContextPropertiesImpl.PROPERTY_USERNAME, sourceDbConnection.getUser());
        props.put(DataContextPropertiesImpl.PROPERTY_URL, sourceDbConnection.getUrl());
        props.put(DataContextPropertiesImpl.PROPERTY_PASSWORD, sourceDbConnection.getPass());

        DataContext dataContext = this.create(new DataContextPropertiesImpl(props),null);
        return  dataContext;
    }
}
