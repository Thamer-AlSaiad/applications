package eyena.eyena;
import eyena.eyena.DAL.DatabaseConnection;
import org.junit.jupiter.api.*;

import java.sql.Connection;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.*;

public class DatabaseConnectionTest {

    @Test
    @DisplayName("Test database connection")
    void testGetConnection() {
        Connection connection = DatabaseConnection.getConnection();
        assertNotNull(connection, "Connection should not be null");
        try {
            assertFalse(connection.isClosed(), "Connection should be open");
        } catch (SQLException e) {
            fail("SQLException occurred: " + e.getMessage());
        }
    }

    @Test
    @DisplayName("Test singleton behavior")
    void testSingleton() {
        Connection connection1 = DatabaseConnection.getConnection();
        Connection connection2 = DatabaseConnection.getConnection();
        assertSame(connection1, connection2, "Connections should be the same instance");
    }
}
