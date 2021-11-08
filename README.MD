## 项目介绍
打印机指令工具类，对TSC和ESC指令进行抽象封装，方便数据转换。

## 使用
```
import {TscCommand,EscCommand} from 'printer-command';
```
## 举例
```js
const tsc = new TscCommand(new TextEncoder("utf-8"));
tsc
.setSize(40, 30)
.setText(0, 0, "4", 1, 0, 0, "Print test")
.setPrint(1);
```
