package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "<!DOCTYPE html>\n" +
               "<html lang=\"zh-CN\">\n" +
               "<head>\n" +
               "    <meta charset=\"UTF-8\">\n" +
               "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
               "    <title>我的小程序</title>\n" +
               "    <style>\n" +
               "        body {\n" +
               "            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;\n" +
               "            max-width: 400px;\n" +
               "            margin: 0 auto;\n" +
               "            padding: 20px;\n" +
               "            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n" +
               "            min-height: 100vh;\n" +
               "        }\n" +
               "        .container {\n" +
               "            background: white;\n" +
               "            border-radius: 20px;\n" +
               "            padding: 30px;\n" +
               "            box-shadow: 0 20px 60px rgba(0,0,0,0.3);\n" +
               "        }\n" +
               "        h1 {\n" +
               "            color: #333;\n" +
               "            text-align: center;\n" +
               "            margin-bottom: 20px;\n" +
               "        }\n" +
               "        .avatar {\n" +
               "            width: 100px;\n" +
               "            height: 100px;\n" +
               "            border-radius: 50%;\n" +
               "            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n" +
               "            margin: 0 auto 20px;\n" +
               "            display: flex;\n" +
               "            align-items: center;\n" +
               "            justify-content: center;\n" +
               "            color: white;\n" +
               "            font-size: 40px;\n" +
               "        }\n" +
               "        .btn {\n" +
               "            display: block;\n" +
               "            width: 100%;\n" +
               "            padding: 15px;\n" +
               "            margin: 10px 0;\n" +
               "            border: none;\n" +
               "            border-radius: 10px;\n" +
               "            font-size: 16px;\n" +
               "            cursor: pointer;\n" +
               "            transition: all 0.3s;\n" +
               "        }\n" +
               "        .btn-primary {\n" +
               "            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n" +
               "            color: white;\n" +
               "        }\n" +
               "        .btn-primary:hover {\n" +
               "            transform: translateY(-2px);\n" +
               "            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);\n" +
               "        }\n" +
               "        .btn-secondary {\n" +
               "            background: #f0f0f0;\n" +
               "            color: #666;\n" +
               "        }\n" +
               "        .btn-secondary:hover {\n" +
               "            background: #e0e0e0;\n" +
               "        }\n" +
               "        .counter {\n" +
               "            text-align: center;\n" +
               "            font-size: 24px;\n" +
               "            color: #667eea;\n" +
               "            margin: 20px 0;\n" +
               "        }\n" +
               "        .message {\n" +
               "            text-align: center;\n" +
               "            color: #888;\n" +
               "            margin-top: 20px;\n" +
               "            font-size: 14px;\n" +
               "        }\n" +
               "    </style>\n" +
               "    <script>\n" +
               "        let count = 0;\n" +
               "        \n" +
               "        function increment() {\n" +
               "            count++;\n" +
               "            document.getElementById('counter').textContent = count;\n" +
               "        }\n" +
               "        \n" +
               "        function decrement() {\n" +
               "            if (count > 0) {\n" +
               "                count--;\n" +
               "                document.getElementById('counter').textContent = count;\n" +
               "            }\n" +
               "        }\n" +
               "        \n" +
               "        function reset() {\n" +
               "            count = 0;\n" +
               "            document.getElementById('counter').textContent = count;\n" +
               "        }\n" +
               "    </script>\n" +
               "</head>\n" +
               "<body>\n" +
               "    <div class=\"container\">\n" +
               "        <div class=\"avatar\">👋</div>\n" +
               "        <h1>欢迎使用小程序</h1>\n" +
               "        <div class=\"counter\">\n" +
               "            计数器: <span id=\"counter\">0</span>\n" +
               "        </div>\n" +
               "        <button class=\"btn btn-primary\" onclick=\"increment()\">+ 增加</button>\n" +
               "        <button class=\"btn btn-secondary\" onclick=\"decrement()\">- 减少</button>\n" +
               "        <button class=\"btn btn-secondary\" onclick=\"reset()\">🔄 重置</button>\n" +
               "        <p class=\"message\">通过链接即可访问此小程序</p>\n" +
               "    </div>\n" +
               "</body>\n" +
               "</html>";
    }
}