package lostcost.lostcost.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.ServletWebRequest;

@RestController
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<ErrorDetails> handleError(ServletWebRequest request) {
        HttpStatus status = HttpStatus.valueOf(request.getResponse().getStatus());
        ErrorDetails errorDetails = new ErrorDetails(status.toString(), "An error occurred");
        return new ResponseEntity<>(errorDetails, status);
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }

    private static class ErrorDetails {
        private final String status;
        private final String message;

        public ErrorDetails(String status, String message) {
            this.status = status;
            this.message = message;
        }

        public String getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }
    }
}
