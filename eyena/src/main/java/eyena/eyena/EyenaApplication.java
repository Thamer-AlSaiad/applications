package eyena.eyena;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class EyenaApplication {

    public static void main(String[] args) {
        SpringApplication.run(EyenaApplication.class, args);
        System.out.println("Success");
        
    }

    @Bean
    public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
        return factory -> factory.setPort(8333);
    }

    @Component
    public static class ServerInfoPrinter {

        @Autowired
        private Environment environment;

        @Bean
        public void printServerInfo() {
            String serverType = environment.getProperty("server.servlet.container");
            System.out.println("Server is running on: " + serverType);
        }
    }
}
