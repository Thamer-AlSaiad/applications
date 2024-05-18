package eyena.eyena.DAL;

public class exceptionHandler extends Exception {
    public final static int FAIL_TO_INSERT = 1;
    public final static int UPDATE_FAILED = 2;
    public final static int ITEM_NOT_FOUND = 4;
    public final static int SQL_ERROR = 3;

    private int errorCode;

    public exceptionHandler(int errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }
}
