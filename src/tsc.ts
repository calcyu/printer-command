export class TscCommand {
    private command: number[] = [];
    private commandStr = '';
    constructor(private textEncoding: { encode(content: string): Uint8Array }) {}

    private addCommand(content: string): TscCommand {
        if (this.textEncoding) {
            const code = this.textEncoding.encode(content);
            for (let i = 0; i < code.length; ++i) {
                this.command.push(code[i]);
            }
        }
        this.commandStr += content;
        return this;
    }

    /**
     * 该指令用于设定卷标纸的宽度和长度
     * 传入参数说明
     * pageWidght：标签宽度 单位mm
     * pageHeight：标签高度 单位mm
     */
    setSize(pageWidght: number, pageHeight: number): TscCommand {
        const data: string = 'SIZE ' + pageWidght.toString() + ' mm' + ',' + pageHeight.toString() + ' mm' + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于定义两张卷标纸间的垂直间距距离
     * 传入参数说明
     * 标签间隙 单位mm
     */
    setGap(printGap: number): TscCommand {
        const data = 'GAP ' + printGap.toString() + ' mm,0 mm\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于设定黑标高度及定义标签印完后标签额外送出的长度
     * 传入参数说明
     * 黑标高度 单位mm
     */
    setBline(printBline: number): TscCommand {
        const data = 'BLINE ' + printBline.toString() + ' mm,0 mm\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于控制在剥离模式时（peel-off mode）每张卷标停止的位置，在打印
     * 下一张时打印机会将原先多推出或少推出的部分以回拉方式补偿回来。该指令仅
     * 适用于剥离模式。
     * 传入参数说明
     * 纸张停止的距离 单位mm
     */
    setOffset(offset: number): TscCommand {
        const data = 'OFFSET ' + offset.toString() + ' mm,0 mm\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于控制打印速度
     *  传入参数说明
     * 1<=printSpeed<=6
     * 实际支持速度以自检页为准
     */
    setSpeed(printSpeed: number): TscCommand {
        const data = 'SPEED ' + printSpeed.toString() + '\r\n';
        return this.addCommand(data);
    }

    /**
   * 该指令用于控制打印时的浓度
    传入参数说明
   * 1<=printDensity<=15
   */
    setDensity(printDensity: number): TscCommand {
        const data = 'DENSITY ' + printDensity.toString() + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于定义打印时出纸和打印字体的方向
     * 传入参数说明
     * direction=0或direction=1
     */
    setDirection(direction: number): TscCommand {
        const data = 'DIRECTION ' + direction + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于定义卷标的参考坐标原点。坐标原点位置和打印方向有关
     * 传入参数说明
     * x 水平方向的坐标位置,单位dots
     * y 垂直方向的坐标位置,单位dots
     * 打印机分辨率200 DPI:  1 mm = 8  dots
     * 打印机分辨率300 DPI:  1 mm = 12 dots
     */
    setReference(x: number, y: number): TscCommand {
        const data = 'REFERENCE ' + x + ',' + y + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令表示标签打印偏移量多少设置
     * 传入参数说明  点数dot
     * n 偏移量 ，单位dot 1mm=8 dots
     * 打印机分辨率200 DPI:  1 mm = 8  dots
     * 打印机分辨率300 DPI:  1 mm = 12 dots
     */
    setShift(n: number): TscCommand {
        const data = 'SHIFT ' + n + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于选择对应的国际字符集
     * 传入参数说明
     *  001:USA
     *  002:French
     *  003:Latin America
     *  034:Spanish
     *  039:Italian
     *  044:United Kingdom
     *  046:Swedish
     *  047:Norwegian
     *  049:German
     */
    setCountry(country: string): TscCommand {
        const data = 'COUNTRY ' + country + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于选择对应的国际代码页
     * 传入参数说明
     * 8-bit codepage 字符集代表
     * 437:United States
     * 850:Multilingual
     * 852:Slavic
     * 860:Portuguese
     * 863:Canadian/French
     * 865:Nordic
     *
     * Windows code page
     * 1250:Central Europe
     * 1252:Latin I
     * 1253:Greek
     * 1254:Turkish
     *
     * 以下代码页仅限于12×24 dot 英数字体
     * WestEurope:WestEurope
     * Greek:Greek
     * Hebrew:Hebrew
     * EastEurope:EastEurope
     * Iran:Iran
     * IranII:IranII
     * Latvian:Latvian
     * Arabic:Arabic
     * Vietnam:Vietnam
     * Uygur:Uygur
     * Thai:Thai
     * 1252:Latin I
     * 1257:WPC1257
     * 1251:WPC1251
     * 866:Cyrillic
     * 858:PC858
     * 747:PC747
     * 864:PC864
     * 1001:PC1001
     */
    setCodepage(codepage: string): TscCommand {
        const data = 'CODEPAGE ' + codepage + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于清除图像缓冲区（image buffer)的数据
     */
    setCls(): TscCommand {
        const data = 'CLS\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于将标签纸向前推送指定的长度
     * 传入参数说明  点数dots
     * 打印机分辨率200 DPI:1 mm = 8  dots
     * 打印机分辨率300 DPI:1 mm = 12 dots
     */
    setFeed(feed: number): TscCommand {
        const data = 'FEED ' + feed + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于将标签纸向后回拉指定的长度
     * 传入参数说明  点数dots
     * 打印机分辨率200 DPI:1 mm = 8  dots
     * 打印机分辨率300 DPI:1 mm = 12 dots
     */
    setBackFeed(backup: number): TscCommand {
        const data = 'BACKFEED ' + backup + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于控制打印机进一张标签纸
     */
    setFromfeed(): TscCommand {
        const data = 'FORMFEED\r\n';
        return this.addCommand(data);
    }

    /**
     * 在使用含有间隙或黑标的标签纸时，若不能确定第一张标签纸是否在正确打印位
     * 置时，此指令可将标签纸向前推送至下一张标签纸的起点开始打印。标签尺寸和
     * 间隙需要在本条指令前设置
     * 注：使用该指令时，纸张高度大于或等于30 mm
     */
    setHome(): TscCommand {
        // 根据Size找到下一张标签纸的位置
        const data = 'HOME\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于打印出存储于影像缓冲区内的数据
     */
    setPagePrint(): TscCommand {
        const data = 'PRINT 1,1\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于打印出存储于影像缓冲区内的数据
     * 传入参数说明  打印份数
     * 1≤n≤65535
     */
    setPrint(n: number): TscCommand {
        const data = 'PRINT ' + n + ',1\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于控制蜂鸣器的频率，可设定10 阶的声音，每阶声音的长短由第二个参数控制
     * 传入参数说明
     * level        音阶:0-9
     * interval 间隔时间:1-4095
     */
    setSound(level: number, interval: number): TscCommand {
        // 控制蜂鸣器
        const data = 'SOUND ' + level + ',' + interval + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于设定打印机进纸时，若经过所设定的长度仍无法侦测到垂直间距，则打印机在连续纸模式工作
     * 传入参数说明  点数dots
     */
    setLimitfeed(limit: number): TscCommand {
        // 检测垂直间距
        const data = 'LIMITFEED ' + limit + 'mm\r\n';
        return this.addCommand(data);
    }

    /**
     * 打印自检页
     */
    setSelfTest(): TscCommand {
        const data = 'SELFTEST\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于在标签上画线
     * 传入参数说明
     * x 线条左上角X 坐标，单位dots
     * y 线条左上角Y 坐标，单位dots
     * width  线宽，单位dots
     * height 线高，单位dots
     */
    setBar(x: number, y: number, width: number, height: number): TscCommand {
        // 绘制线条
        const data = 'BAR ' + x + ',' + y + ',' + width + ',' + height + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于在卷标上绘制矩形方框
     * x 方框左上角X 坐标，单位dots
     * y 方框左上角Y 坐标，单位dots
     * endX 方框右下角X 坐标，单位dots
     * endY 方框右下角Y 坐标，单位dots
     * thickness 方框线宽，单位dots
     */
    setBox(x: number, y: number, endX: number, endY: number, thickness: number): TscCommand {
        const data = 'BOX ' + x + ',' + y + ',' + endX + ',' + endY + ',' + thickness + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用来画一维条码
     * 传入参数说明
     * x 左上角水平坐标起点，以点（dot）表示
     * y 左上角垂直坐标起点，以点（dot）表示
     * height 条形码高度，以点（dot）表示
     *readable 0 表示人眼不可识，1 表示人眼可识
     *rotation 条形码旋转角度，顺时针方向 0,90,180,270
     * narrow 窄bar 宽度，以点（dots）表示
     * wide 宽bar 宽度，以点（dot）表示
     * content 打印内容
     */
    setBarCode(
        x: number,
        y: number,
        codetype: string,
        height: number,
        readable: number,
        rotation: number,
        narrow: number,
        wide: number,
        content: string
    ): TscCommand {
        const data =
            'BARCODE ' +
            x +
            ',' +
            y +
            ',"' +
            codetype +
            '",' +
            height +
            ',' +
            readable +
            ',' +
            rotation +
            ',' +
            narrow +
            ',' +
            wide +
            ',"' +
            content +
            '"\r\n';
        return this.addCommand(data);
    }

    /**
     * 打印图片（单色图片）
     * res为画布参数
     */
    setBitmap(x: number, y: number, mode: number, res: any): TscCommand {
        console.log(res);
        const w = res.width;
        const h = res.height;
        const bitw: number = parseInt(((w + 7) / 8) as unknown as string) * 8;
        // let bitw = (parseInt(w) % 8) == 0 ? (parseInt(w) / 8) :( parseInt(w) / 8+1);
        const pitch: number = bitw / 8;
        const bits = new Uint8Array(h * pitch);
        console.log('w=' + w + ', h=' + h + ', bitw=' + bitw + ', pitch=' + pitch + ', bits=' + bits.length);
        const cmd = 'BITMAP ' + x + ',' + y + ',' + pitch + ',' + h + ',' + mode + ',';
        console.log('add cmd: ' + cmd);
        this.addCommand(cmd);
        // for (let i=0; i<bits.length; i++): TscCommand {
        //   bits[i] = 0;
        // }
        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                const color = res.data[(y * w + x) * 4 + 1];
                if (color <= 128) {
                    bits[y * pitch + x / 8] |= 0x80 >> x % 8;
                }
            }
        }
        for (let i = 0; i < bits.length; i++) {
            this.command.push(~bits[i] & 0xff);
        }
        console.log(this.command);
        return this;
    }

    /**
     * 将指定的区域反相打印
     * 传入参数说明
     * x 反相区域左上角X 坐标，单位dot
     * y 反相区域左上角Y 坐标，单位dot
     * width 反相区域宽度，单位dot
     * height 反相区域高度，单位dot
     */
    setErase(x: number, y: number, width: number, height: number): TscCommand {
        const data = 'ERASE ' + x + ',' + y + ',' + width + ',' + height + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 将指定的区域反相打印
     * 传入参数说明
     * x 反相区域左上角X 坐标，单位dot
     * y 反相区域左上角Y 坐标，单位dot
     * width 反相区域宽度，单位dot
     * height 反相区域高度，单位dot
     */
    setReverse(x: number, y: number, width: number, height: number): TscCommand {
        const data = 'REVERSE ' + x + ',' + y + ',' + width + ',' + height + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用于打印字符串
     * 传入参数说明
     * x 文字X 方向起始点坐标
     *  y 文字Y 方向起始点坐标
     *  font 字体名称
     *  1 8×12 dot 英数字体
     *  2 12×20 dot 英数字体
     *  3 16×24 dot 英数字体
     *  4 24×32 dot 英数字体
     *  5 32×48 dot 英数字体
     *  6 14×19 dot 英数字体OCR-B
     *  7 21×27 dot 英数字体OCR-B
     *  8 14×25 dot 英数字体OCR-A
     *  9 9×17 dot 英数字体
     *  10 12×24 dot 英数字体
     *  TSS16.BF2 简体中文16×16（GB 码）
     *  TSS20.BF2 简体中文20×20（GB 码）
     *  TST24.BF2 繁体中文24×24（大五码）
     *  TSS24.BF2 简体中文24×24（GB 码）
     *  K 韩文24×24Font（KS 码）
     * TSS32.BF2 简体中文32×32（GB 码）
     * rotation 文字旋转角度（顺时针方向） 0， 90， 180， 270
     */
    setText(x: number, y: number, font: string, rotation: number, x_: number, y_: number, str: string): TscCommand {
        const data =
            'TEXT ' + x + ',' + y + ',"' + font + '",' + rotation + ',' + x_ + ',' + y_ + ',' + '"' + str + '"\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用来打印二维码
     * ｘ 二维码水平方向起始点坐标
     * ｙ 二维码垂直方向起始点坐标
     * ECC level 选择QRCODE 纠错等级
     *   L 7%
     *   M 15%
     *   Q 25%
     *   H 30%
     * cell width 二维码宽度1-10
     * mode 手动/自动编码
     *   A Auto
     *   M Manual
     * rotation 旋转角度（顺时针方向） 0，90，180，270
     * content  内容
     */
    setQrcode(x: number, y: number, level: string, width: number, mode: string, content: string): TscCommand {
        const data =
            'QRCODE ' + x + ',' + y + ',' + level + ',' + width + ',' + mode + ',' + 0 + ',"' + content + '"\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用来起动Key1 的预设功能
     * 传入参数说明
     * ON 开启按键
     * OFF 关闭按键
     */
    setKey1(n: string): TscCommand {
        const data = 'SET KYE1 ' + n.toString + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用来起动Key2 的预设功能
     * 传入参数说明
     * ON 开启按键
     * OFF 关闭按键
     */
    setKey2(n: string): TscCommand {
        const data = 'SET KYE2 ' + n.toString + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 该指令用来启动/关闭剥离模式，默认值为关闭
     * 传入参数说明
     * ON  起动剥离模式
     * OFF 关闭剥离模式
     */
    setPeel(n: string): TscCommand {
        const data = 'SET PEEL ' + n.toString + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 此命令是用来启用/禁用撕纸位置走到撕纸处，此设置关掉电源后将保存在打印机内
     * 传入参数说明
     * ON 启用撕纸位置走到撕纸处
     * OFF 禁用撕纸位置走到撕纸处，命令在起始位置有效
     */
    setTear(n: string): TscCommand {
        const data = 'SET TEAR ' + n.toString + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 此命令是用来启用/禁用撕纸位置走到撕纸处，此设置关掉电源后将保存在打印机内
     * 传入参数说明
     * ON 启用撕纸位置走到撕纸处
     * OFF 禁用撕纸位置走到撕纸处，命令在起始位置有效
     */
    setStripper(n: string): TscCommand {
        const data = 'SET STRIPPER ' + n.toString + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 此设置用于启用/禁用打印头合盖传感器。如果禁用合盖传感器，打印机头被打开时，将不会传回错误信息。
     * 此设置将保存在打印机内存。
     * 传入参数说明
     * ON  启用打印头合盖传感器
     * OFF 禁用打印头合盖传感器
     */
    setHead(n: string): TscCommand {
        const data = 'SET HEAD ' + n.toString + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 此命令将禁用/启用标签机在无纸或开盖错误发生后，上纸或合盖后重新打印一次标签内容
     * 传入参数说明
     * OFF 禁止此功能
     * ON 启用此功能
     */
    setReprint(n: string): TscCommand {
        const data = 'SET REPRINT ' + n.toString + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 设定开启/关闭碳带感应器，即切换热转式/热感印式打印。通常打印机于开启电
     *源时，碳带感应器即会自动检测打印机是否已装上碳带，并藉此决定使用热感式
     *或热转式打印。此项设定并不会存于打印机中。此方法仅适用于热转式机器。
     * 传入参数说明
     * OFF 禁止此功能
     * ON 启用此功能
     */
    setRibbon(n: string): TscCommand {
        const data = 'SET RIBBON ' + n.toString + '\r\n';
        return this.addCommand(data);
    }

    /**
     * 此命令用于设置切刀状态，关闭打印机电源后，该设置将会被存储在打印机内存中。
     * 传入参数说明
     * OFF 关闭切刀功能
     * BATCH 在PRINT 命令结束后切纸
     * pieces 0-65535，用于设置每几个标签进行切纸
     */
    setCut(n: string): TscCommand {
        const data = 'SET CUTTER ' + n.toString + '\r\n';
        return this.addCommand(data);
    }

    clean(): TscCommand {
        this.command = [];
        return this;
    }

    getDataBuffer(): ArrayBufferLike {
        return new Int8Array(this.command).buffer;
    }

    getCommand(): string {
        return this.commandStr;
    }
}
