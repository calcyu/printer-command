'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EscCommand = void 0;
class EscCommand {
    constructor(textEncoder) {
        this.textEncoder = textEncoder;
        this.data = [];
        this.bar = ['UPC-A', 'UPC-E', 'EAN13', 'EAN8', 'CODE39', 'ITF', 'CODABAR', 'CODE93', 'CODE128'];
    }
    /**
     * ESC @ 初始化打印机
     * 清除打印缓冲区数据，打印模式被设为上电时的默认值模式
     */
    init() {
        this.data.push(27);
        this.data.push(64);
        return this;
    }
    /**
     *LF 打印并换行
     *将打印缓冲区中的数据打印出来，并且按照当前行间距，把打印纸向前推进一行。
     */
    setPrint() {
        this.data.push(10);
        return this;
    }
    /**
     * ESC J 打印并走纸n 个单位
     * 打印缓冲区数据并走纸[n × 纵向或横向移动单位]英寸。
     */
    setPrintAndFeed(n) {
        this.data.push(27);
        this.data.push(74);
        this.data.push(n);
        return this;
    }
    /**
     * ESC d 打印并走纸n 行
     * 打印缓冲区里的数据并向前走纸n 行（字符行）
     */
    setPrintAndFeedRow(n) {
        this.data.push(27);
        this.data.push(100);
        this.data.push(n);
        return this;
    }
    /**
     * HT 水平定位
     *移动打印位置到下一个水平定位点的位置
     */
    setHorTab() {
        this.data.push(9);
        return this;
    }
    /**
     * ESC $ 设置绝对打印位置
     * 将当前位置设置到距离行首（nL + nH × 256）×（横向或纵向移动单位）处。
     * 传入参数为点数
     * 1mm=8dot
     */
    setAbsolutePrintPosition(where) {
        this.data.push(27);
        this.data.push(36);
        this.data.push(Math.floor(where % 256));
        this.data.push(Math.floor(where / 256));
        return this;
    }
    /**
     * ESC \ 设置相对横向打印位置
     * 以横向或纵向移动单位设置横向相对位移
     * 传入参数为点数
     * 1mm=8dot
     */
    setRelativePrintPositon(where) {
        // 设置相对横向打印位置
        this.data.push(27);
        this.data.push(92);
        this.data.push(Math.floor(where % 256));
        this.data.push(Math.floor(where / 256));
        return this;
    }
    /**
     * ESC a 选择对齐方式
     * 使所有的打印数据按某一指定对齐方式排列。
     * n 的取值与对齐方式对应关系如下
     * • 当n 为0 时 ： 左对齐
     * • 当n 为1 时 ： 中间对齐
     * • 当n 为2 时  右对齐
     */
    setSelectJustification(which) {
        this.data.push(27);
        this.data.push(97);
        this.data.push(which);
        return this;
    }
    /**
     * GS L 设置左边距
     * 传入参数为点数
     * 1mm=8dot
     */
    setLeftMargin(n) {
        this.data.push(29);
        this.data.push(76);
        this.data.push(Math.floor(n % 256));
        this.data.push(Math.floor(n / 256));
        return this;
    }
    /**
     * GS W 设置打印区域宽度
     * 传入参数为点数
     * 1mm=8dot
     */
    setPrintingAreaWidth(width) {
        this.data.push(29);
        this.data.push(87);
        this.data.push(Math.floor(width % 256));
        this.data.push(Math.floor(width / 256));
        return this;
    }
    /**
     * GS P 设置横向和纵向移动单位
     * 传入参数为点数
     * 1mm=8dot
     */
    setHorizontalAndVertical(x, y) {
        this.data.push(29);
        this.data.push(80);
        this.data.push(x);
        this.data.push(y);
        return this;
    }
    /**
   * DLE DC4 实时产生钱箱开启脉冲
   * 在指定的钱箱插座引脚产生设定的开启脉冲，引脚由m 指定：
     m 连接引脚
     0 钱箱插座引脚2
     1 钱箱插座引脚5
   * 脉冲高电平时间为[t × 100 ms]，低电平的时间为[t × 100 ms]
   */
    setCashboxPulse(n, m, t) {
        this.data.push(16);
        this.data.push(20);
        this.data.push(n);
        this.data.push(m);
        this.data.push(t);
        return this;
    }
    /**
     * ESC c 3 选择打印纸传感器以输出缺纸信号
     * 传入参数说明
     * • 当n 为0 时：关闭纸将尽传感器
     * • 当n 为1 时：开启纸将尽传感器
     * • 当n 为2 时：开启纸将尽传感器
     * • 当n 为3 时：开启纸尽传感器
     * • 当n 为4 时：开启纸尽传感器
     */
    setPrintPageSignal(n) {
        this.data.push(27);
        this.data.push(99);
        this.data.push(51);
        this.data.push(n);
        return this;
    }
    /**
     * ESC c 4 选择打印纸传感器以停止打印
     * 传入参数说明
     * • 当n 为0 时：禁止纸将尽传感器
     * • 当n 为1 时：允许纸将尽传感器
     * • 当n 为2 时：允许纸将尽传感器
     */
    setSensorToStopPrint(n) {
        this.data.push(27);
        this.data.push(99);
        this.data.push(52);
        this.data.push(n);
        return this;
    }
    /**
     * ESC c 5 允许/禁止按键
     * 允许/禁止按键
     * 传入参数说明
     * • 当n 为0 时，按键起作用。
     * • 当n 为1 时，按键被禁止。
     */
    setSelectKey(n) {
        this.data.push(27);
        this.data.push(99);
        this.data.push(53);
        this.data.push(n);
        return this;
    }
    /**
     * ESC p 产生钱箱控制脉冲
     * 输出由t1 和t2 设定的钱箱开启脉冲到由m 指定的引脚：
     * 传入参数说明
     * • 当m 为0 时，钱箱插座的引脚2
     * • 当m 为1 时，钱箱插座的引脚5
     */
    setCashCashboxPulse(m, t1, t2) {
        this.data.push(27);
        this.data.push(112);
        this.data.push(m);
        this.data.push(t1);
        this.data.push(t2);
        return this;
    }
    /**
     * ESC = 选择打印机
     * 选择打印机，被选择的打印机可以接收主计算机发送的数据
     * 传入参数说明
     * • 当n 为0 时，打印机禁止
     * • 当n 为1 时，打印机允许。
     */
    setSelectPrinter(n) {
        this.data.push(27);
        this.data.push(112);
        this.data.push(n);
        return this;
    }
    /**
     * ESC 2 设置默认行间距
     *选择默认行间距
     */
    setDefaultLineSpace() {
        this.data.push(27);
        this.data.push(50);
        return this;
    }
    /**
     * ESC 3 设置行间距
     * 传入参数为点数
     * 1mm=8dot
     */
    setLineSpace(n) {
        this.data.push(27);
        this.data.push(51);
        this.data.push(n);
        return this;
    }
    /**
     * ESC SP 设置字符右间距
     * 传入参数为点数
     * 1mm=8dot
     */
    setCharacterRightSpace(n) {
        this.data.push(27);
        this.data.push(32);
        this.data.push(n);
        return this;
    }
    /**
     * ESC ! 选择打印模式
     * 传入参数说明
     * 根据n 的值设置字符打印模式
     */
    setPrintMode(mode) {
        // 设置打印模式
        this.data.push(27);
        this.data.push(33);
        this.data.push(mode);
    }
    /**
     * ESC % 选择/取消用户自定义字符
     * • 当n 为0 时，不使用用户自定义字符。
     * • 当n 为1 时，使用用户自定义字符。
     */
    setUserDefinitionCharacter(n) {
        this.data.push(27);
        this.data.push(37);
        this.data.push(n);
        return this;
    }
    /**
     * ESC – 选择/取消下划线模式
     * 传入参数说明
     * • 当n 为0 时：取消下划线模式
     * • 当n 为1 时：选择下划线模式（1 点宽）
     * • 当n 为2 时：选择下划线模式（2 点宽）
     */
    setUnderlineMode(n) {
        this.data.push(27);
        this.data.push(45);
        this.data.push(n);
        return this;
    }
    /**
     * ESC ? 取消用户自定义字符
     * 传入参数说明
     * 取消用户自定义字符中代码为n 的字符。取消后，此字符使用内部字库
     */
    setCancleUserDefinitionCharacter(n) {
        this.data.push(27);
        this.data.push(63);
        this.data.push(n);
        return this;
    }
    /**
     * ESC E 选择/取消加粗模式
     * 传入参数说明
     * 当n 为0 时，取消加粗模式。
     * 当n 为1 时，选择加粗模式。
     */
    setBoldMode(n) {
        this.data.push(27);
        this.data.push(69);
        this.data.push(n);
        return this;
    }
    /**
     * ESC G 选择/取消双重打印模式
     *传入参数说明
     *• 当n 位为0 时，取消双重打印模式。
     *• 当n 位为1 时，选择双重打印模式。
     */
    setDoublePrintMode(n) {
        this.data.push(27);
        this.data.push(71);
        this.data.push(n);
        return this;
    }
    /**
     * ESC M 选择字体
     * 传入参数说明
     * • 当n 位为0 时， 选择标准ASCII 码字体(12 × 24)
     * • 当n 位为1 时， 选择压缩ASCII 码字体(9 × 17))
     */
    setSelectFont(n) {
        this.data.push(27);
        this.data.push(77);
        this.data.push(n);
        return this;
    }
    /**
     * ESC R 选择国际字符集
     * 传入参数说明
     * • 当n 位为0 时， 选择美国（默认）
     * • 当n 位为1 时， 选择法国
     * • 当n 位为2 时， 选择德国
     * • 当n 位为3 时， 选择英国
     * • 当n 位为4 时， 选择丹麦I
     * • 当n 位为5 时， 选择瑞典
     * • 当n 位为6 时， 选择意大利
     * • 当n 位为7 时， 选择西班牙I
     * • 当n 位为8 时， 选择日本
     * • 当n 位为9 时， 选择挪威
     * • 当n 位为10 时， 选择丹麦II
     * • 当n 位为11 时， 选择西班牙II
     * • 当n 位为12 时， 选择拉丁美洲
     * • 当n 位为13 时， 选择韩国
     * • 当n 位为14 时， 选择斯洛维尼亚/克罗帝亚
     * • 当n 位为15 时， 选择中国
     */
    setInternationalCharacters(n) {
        this.data.push(27);
        this.data.push(82);
        this.data.push(n);
        return this;
    }
    /**
     * ESC V 选择/取消顺时针旋转90 度
     * 传入参数说明
     * • 当n 位为0 时， 取消顺时针旋转90 度模式
     * • 当n 位为1 时，选择顺时针旋转90 度模式
     */
    setRotate90(n) {
        this.data.push(27);
        this.data.push(86);
        this.data.push(n);
        return this;
    }
    /**
     * ESC t 选择字符代码页
     * 传入参数说明
     * • 当n 位为0 时， 选择PC437 [美国，欧洲标准]（默认）
     * • 当n 位为1 时， 选择日文片假名
     * • 当n 位为2 时， 选择PC850 [多语言]
     * • 当n 位为3 时， 选择PC860 [葡萄牙语]
     * • 当n 位为4 时， 选择PC863 [加拿大-法语]
     * • 当n 位为5 时， 选择PC865 [北欧]
     * • 当n 位为6 时， 选择West Europe
     * • 当n 位为7 时， 选择Greek
     * • 当n 位为8 时， 选择Hebrew
     * • 当n 位为9 时， 选择PC755:East Europe
     * • 当n 位为10 时， 选择Iran
     *
     * • 当n 位为16 时， 选择WPC1252
     * • 当n 位为17 时， 选择PC866:Cyrillice*2
     * • 当n 位为18 时， 选择PC852:Latin2
     * • 当n 位为19 时， 选择PC858
     * • 当n 位为20 时， 选择Inrall
     * • 当n 位为21 时， 选择Latvian
     * • 当n 位为22 时， 选择Arabic
     * • 当n 位为23 时， 选择PT151,1251
     * • 当n 位为24 时， 选择PC747
     * • 当n 位为25 时， 选择WPC1257
     *
     * • 当n 位为27 时， 选择Vietnam
     * • 当n 位为28 时， 选择PC864
     * • 当n 位为29 时， 选择PC1001
     * • 当n 位为30 时， 选择Uygur
     *
     * • 当n 位为255 时， 选择Uygur
     * 打印机支持代码页请以打印机自检测试页为准
     */
    setCodePage(n) {
        this.data.push(27);
        this.data.push(116);
        this.data.push(n);
        return this;
    }
    /**
     * ESC { 选择/取消倒置打印模式
     * 传入参数说明
     * • 当n 位为0 时， 选择PC437 [美国，欧洲标准]（默认）
     * • 当n 位为1 时， 选择日文片假名
     */
    setInvertPrintMode(n) {
        this.data.push(27);
        this.data.push(123);
        this.data.push(n);
        return this;
    }
    /**
     * GS ! 选择字符大小
     * 传入参数说明
     *（1 ≤ 纵向放大倍数≤ 8，1 ≤ 横向放大倍数≤ 8）
     *一个byte 有8 位，用0 到2 位选择字符高度，4 到6 位选择字符宽度
     * • 当n 位为0 时， 正常
     * • 当n 位为16 时，2（倍宽）
     * • 当n 位为32 时，3（倍宽）
     * • 当n 位为48 时，4（倍宽）
     * • 当n 位为64 时，5（倍宽）
     * • 当n 位为80 时，6（倍宽）
     * • 当n 位为96 时，7（倍宽）
     * • 当n 位为112 时，8（倍宽）
     *
     * • 当n 位为16 时，2（倍高）
     * • 当n 位为32 时，3（倍高）
     * • 当n 位为48 时，4（倍高）
     * • 当n 位为64 时，5（倍高）
     * • 当n 位为80 时，6（倍高）
     * • 当n 位为96 时，7（倍高）
     * • 当n 位为112 时，8（倍高）
     * 若需要倍宽倍高，请在同等倍数下相加 如17为倍宽倍高
     */
    setCharacterSize(n) {
        this.data.push(29);
        this.data.push(33);
        this.data.push(n);
        return this;
    }
    /**
     * GS B 选择/取消黑白反显打印模式
     * 传入参数说明
     * • 当n 位为0 时，取消反显打印
     * • 当n 位为1 时，选择反显打印
     */
    setReverseMode(n) {
        this.data.push(29);
        this.data.push(66);
        this.data.push(n);
        return this;
    }
    // private convertPartialToBitmap(w: number, start_y: number, bith: number, pitch: number, res: { data: [] }) {
    //   console.log('convert bitmap: ' + w + ', ' + start_y + ', ' + bith + ', ' + pitch);
    //   var bits = new Uint8Array(bith * pitch);
    //   this.data.push(29) // 0x1D
    //   this.data.push(118) // 0x76
    //   this.data.push(48) // 0x30
    //   this.data.push(0) // 0x00
    //   this.data.push(Math.floor(pitch % 256));
    //   this.data.push(Math.floor(pitch / 256));
    //   this.data.push(Math.floor(bith % 256));
    //   this.data.push(Math.floor(bith / 256));
    //   for (var y = 0; y < bith; y++) {
    //     for (var x = 0; x < w; x++) {
    //       var color = res.data[((y + start_y) * w + x) * 4];
    //       if (color < 128) {
    //         bits[Math.floor(y * pitch + x / 8)] |= (0x80 >> (x % 8));
    //       }
    //     }
    //   }
    //   for (var i = 0; i < bits.length; i++) {
    //     this.data.push(bits[i]);
    //   }
    // }
    /*
  单色图片转成多张bitmap, 高度按BLOCK_SIZE拆分图片
  */
    // private convertToMultiBitmap(res: { width: number, height: number, data: [] }) {
    //   var w = res.width;
    //   var h = res.height;
    //   const BLOCK_SIZE = 128;
    //   var pitch = Math.floor((w + 7) / 8);
    //   var block = Math.floor((h + BLOCK_SIZE - 1) / BLOCK_SIZE);
    //   console.log(w + "--" + h);
    //   for (var i = 0; i < block; i++) {
    //     var bith = BLOCK_SIZE;
    //     if (i * BLOCK_SIZE + bith > h) {
    //       bith = h - i * BLOCK_SIZE;
    //     }
    //     this.convertPartialToBitmap(w, i * BLOCK_SIZE, bith, pitch, res);
    //   }
    //   console.log(this.data);
    // }
    /*
  单色图片整图转成一张bitmap
  */
    convertToSingleBitmap(res) {
        console.log(res);
        const w = res.width;
        const h = res.height;
        const bitw = Math.floor((w + 7) / 8) * 8;
        const bith = h;
        const pitch = Math.floor(bitw / 8);
        const bits = new Uint8Array(bith * pitch);
        console.log(w + '--' + h);
        console.log('bitw=' + bitw + ', bith=' + bith + ', pitch=' + pitch);
        this.data.push(29); // 0x1D
        this.data.push(118); // 0x76
        this.data.push(48); // 0x30
        this.data.push(0); // 0x00
        this.data.push(Math.floor(pitch % 256));
        this.data.push(Math.floor(pitch / 256));
        this.data.push(Math.floor(bith % 256));
        this.data.push(Math.floor(bith / 256));
        console.log(res.data.length);
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const color = res.data[(y * w + x) * 4];
                if (color < 128) {
                    bits[Math.floor(y * pitch + x / 8)] |= 0x80 >> x % 8;
                }
            }
        }
        for (let i = 0; i < bits.length; i++) {
            this.data.push(bits[i]);
        }
    }
    /**
     * GS v 0 打印光栅位图
     *
     */
    setBitmap(res) {
        // 参数，画布的参数
        console.log(res);
        this.convertToSingleBitmap(res); // 转成单张位图
        // convertToMultiBitmap(res) // 转成多张位图
        console.log(this.data);
        return this;
    }
    /**
     * GS H 选择HRI 字符的打印位置
     * 传入参数说明
     * • 当n 位为0 时，不打印
     * • 当n 位为1 时，条码上方
     * • 当n 位为2 时，条码下方
     * • 当n 位为3 时，条码上、下方
     */
    setHRIPosition(position) {
        this.data.push(29);
        this.data.push(72);
        this.data.push(position);
        return this;
    }
    /**
     * GS f 选择HRI 使用字体
     * 传入参数说明
     * • 当n 位为0 时，标准ASCII 码字符(12 × 24)
     * • 当n 位为1 时，压缩ASCII 码字符(9 × 17)
     */
    setHRIFont(font) {
        this.data.push(29);
        this.data.push(102);
        this.data.push(font);
        return this;
    }
    /**
     * GS h 选择条码高度
     * 传入参数说明
     * 2 ≤ n ≤ 6
     */
    setBarcodeWidth(width) {
        this.data.push(29);
        this.data.push(119);
        if (width > 6) {
            width = 6;
        }
        if (width < 2) {
            width = 1;
        }
        this.data.push(width);
        return this;
    }
    /**
     * GS h 选择条码高度
     * 传入参数说明
     * 1 ≤ n ≤ 255
     */
    setBarcodeHeight(height) {
        this.data.push(29);
        this.data.push(104);
        this.data.push(height);
        return this;
    }
    /**
     * 打印条码128类型
     */
    setCode128(content) {
        this.data.push(29);
        this.data.push(107);
        this.data.push(73);
        const code = this.textEncoder.encode(content);
        this.data.push(code.length);
        for (let i = 0; i < code.length; ++i) {
            this.data.push(code[i]);
        }
        return this;
    }
    /**
     * 打印条码
     * 传入参数说明
     * t:条码类型
     * content：内容
     */
    setBarcodeContent(t, content) {
        let ty = 73;
        this.data.push(29);
        this.data.push(107);
        switch (t) {
            case this.bar[0]:
                ty = 65;
                break;
            case this.bar[1]:
                ty = 66;
                break;
            case this.bar[2]:
                ty = 67;
                break;
            case this.bar[3]:
                ty = 68;
                break;
            case this.bar[4]:
                ty = 69;
                break;
            case this.bar[5]:
                ty = 70;
                break;
            case this.bar[6]:
                ty = 71;
                break;
            case this.bar[7]:
                ty = 72;
                break;
            case this.bar[8]:
                ty = 73;
                break;
        }
        this.data.push(ty);
        this.data.push(content);
        return this;
    }
    /**
     * FS ! 设置汉字字符模式
     * 传入参数说明
     * • 当n 位为0 时，取消倍宽、倍高、取消下划线
     * • 当n 位为4 时，选择倍宽
     * • 当n 位为8 时，选择倍高
     * • 当n 位为128 时，选择下划线
     */
    setChineseCharacterMode(n) {
        this.data.push(28);
        this.data.push(33);
        this.data.push(n);
        return this;
    }
    /**
     * FS & 选择汉字模式
     */
    setSelectChineseCharacter() {
        this.data.push(28);
        this.data.push(38);
        return this;
    }
    /**
     * FS . 取消汉字模式
     */
    setCancelChineseCharacter() {
        this.data.push(28);
        this.data.push(46);
        return this;
    }
    /**
     * FS - 选择/取消汉字下划线模式
     * 传入参数说明
     * • 当n 位为0 时，取消汉字下划线
     * • 当n 位为1 时，选择汉字下划线（1 点宽）
     * • 当n 位为2 时，选择汉字下划线（2 点宽）
     */
    setCancelUnderLine(n) {
        this.data.push(28);
        this.data.push(45);
        this.data.push(n);
        return this;
    }
    /**
     * FS S 设置汉字字符左右间距
     * 传入参数说明
     * 分别将汉字的左间距和右间距设置为n1 和n2
     * 传入点数，1mm=8dot
     */
    setChineseCharacterSpace(n1, n2) {
        this.data.push(28);
        this.data.push(83);
        this.data.push(n1);
        this.data.push(n2);
        return this;
    }
    /**
     * FS W 选择/取消汉字倍高倍宽
     * • 当n 的最低位为0，取消汉字倍高倍宽模式。
     * • 当n 的最低位为1，选择汉字倍高倍宽模式。
     */
    setChineseCharacteHeightWidth(n) {
        this.data.push(28);
        this.data.push(87);
        this.data.push(n);
        return this;
    }
    /**
     * GS ( F 设置黑标定位偏移量
     * 该命令用于选择黑标定位控制允许，且设置切/撕纸位置或起始打印位置相对于黑标检测的偏移值。该值以点数计算。
     * p
     * 传入点数
     *
     * a = 1, 2;
     * a=1:设置起始打印位置相对于黑标检测位置的偏移量
     * a=2:设置切/撕纸位置相对于黑标检测位置的偏移量
     *
     * m = 0, 48
     * m=0 或48，选择偏移量为前进纸方向计算；
     *
     * 0 ≤ n ≤ 1700
     */
    setBlackMaskOffset(p, a, m, n) {
        this.data.push(29);
        this.data.push(40);
        this.data.push(70);
        this.data.push(p % 256);
        this.data.push(p / 256);
        this.data.push(a);
        this.data.push(m);
        this.data.push(n % 256);
        this.data.push(n / 256);
        return this;
    }
    /**
     * GS FF 设置黑标至打印起始位置
     */
    setBlackMarkStart() {
        // 黑标至打印起始位置
        this.data.push(29);
        this.data.push(12);
        return this;
    }
    /**
     * GS V 选择切纸模式并切纸
     * 半切
     */
    setCutter() {
        this.data.push(29);
        this.data.push(86);
        this.data.push(1);
        return this;
    }
    /**
     * GS V 选择切纸模式并切纸
     * 传入参数说明
     * 传入点数，1mm=8dot
     * 进纸n 并且半切纸
     */
    setCut(n) {
        this.data.push(29);
        this.data.push(86);
        this.data.push(101);
        this.data.push(n);
        return this;
    }
    /**
     * ESC B 打印机来单打印蜂鸣提示
     * 传入参数说明
     * 1 ≤ n ≤ 9
     * 1 ≤ t ≤ 9
     * n 是指蜂鸣器鸣叫次数。
     * t 是指蜂鸣器鸣每次数鸣叫时间为(t × 50) ms
     */
    setSound(n, t) {
        // 设置蜂鸣器
        this.data.push(27);
        this.data.push(66);
        if (n < 0) {
            n = 1;
        } else if (n > 9) {
            n = 9;
        }
        if (t < 0) {
            t = 1;
        } else if (t > 9) {
            t = 9;
        }
        this.data.push(n);
        this.data.push(t);
        return this;
    }
    /**
     * ESC C 打印机来单打印蜂鸣提示及报警灯闪烁
     * 传入参数说明
     * 1 ≤ m ≤ 20，1 ≤ t ≤ 20，0 ≤ n ≤ 3
     *
     * m：指报警灯闪烁次数或蜂鸣器鸣叫次数
     *
     * t：指报警灯闪烁间隔时间为(t × 50) ms 或蜂鸣器鸣叫间隔时间为(t × 50) ms
     *
     * 当n = 0 时，蜂鸣器不鸣叫，同时报警灯不闪烁
     * 当n = 1 时，蜂鸣器鸣叫
     * 当n = 2 时，报警灯闪烁
     * 当n = 3 时，蜂鸣器鸣叫，同时报警灯闪烁
     */
    setOrderTip(m, t, n) {
        this.data.push(27);
        this.data.push(67);
        if (m < 0) {
            m = 1;
        } else if (m > 20) {
            n = 20;
        }
        if (t < 0) {
            t = 1;
        } else if (t > 20) {
            t = 20;
        }
        if (n < 0) {
            n = 1;
        } else if (n > 3) {
            n = 3;
        }
        this.data.push(m);
        this.data.push(t);
        this.data.push(n);
        return this;
    }
    /**
     * 设置QRCode 模块大小为n dot
     * 传入参数说明
     * 1 ≤ n ≤ 15
     * [默认值] n = 3
     */
    setSelectSizeOfModuleForQRCode(n) {
        // 设置二维码大小
        this.data.push(29);
        this.data.push(40);
        this.data.push(107);
        this.data.push(3);
        this.data.push(0);
        this.data.push(49);
        this.data.push(67);
        if (n > 15) {
            n = 15;
        }
        if (n < 1) {
            n = 1;
        }
        this.data.push(n);
        return this;
    }
    /**
     * 选择QRCode 纠错等级
     * 传入参数说明
     * n      功能        纠错能力
     * 48    选择纠错等级  L 7
     * 49    选择纠错等级  M 15
     * 50    选择纠错等级  Q 25
     * 51    选择纠错等级  H 30
     */
    setSelectErrorCorrectionLevelForQRCode(n) {
        this.data.push(29);
        this.data.push(40);
        this.data.push(107);
        this.data.push(3);
        this.data.push(0);
        this.data.push(49);
        this.data.push(69);
        this.data.push(n);
        return this;
    }
    /**
     * 存储QRCode 数据(d1...dk)到符号存储区
     */
    setStoreQRCodeData(content) {
        const code = this.textEncoder.encode(content);
        this.data.push(29);
        this.data.push(40);
        this.data.push(107);
        this.data.push(Math.floor((code.length + 3) % 256));
        this.data.push(Math.floor((code.length + 3) / 256));
        this.data.push(49);
        this.data.push(80);
        this.data.push(48);
        for (let i = 0; i < code.length; ++i) {
            this.data.push(code[i]);
        }
        return this;
    }
    /**
     * 打印QRCode 条码
     */
    setPrintQRCode() {
        this.data.push(29);
        this.data.push(40);
        this.data.push(107);
        this.data.push(3);
        this.data.push(0);
        this.data.push(49);
        this.data.push(81);
        this.data.push(48);
        return this;
    }
    /**
     * 设置GB18030编码格式文字
     */
    setText(content) {
        const code = this.textEncoder.encode(content);
        for (let i = 0; i < code.length; ++i) {
            this.data.push(code[i]);
        }
        return this;
    }
    /**
     * 添加用户自定义指令
     */
    setUserCommand(content) {
        // 添加用户指令
        this.data.push(content);
        return this;
    }
    getData() {
        // 获取打印数据
        return this.data;
    }
    clearData() {
        // 获取打印数据
        if (this.data.length > 0) {
            this.data = [];
        }
        return this;
    }
    getRealtimeStatusTransmission(n) {
        // 查询打印机实时状态
        /*
    n = 1：传送打印机状态
    n = 2：传送脱机状态
    n = 3：传送错误状态
    n = 4：传送纸传感器状态
    */
        const buf = new ArrayBuffer(3);
        const dateView = new DataView(buf);
        dateView.setUint8(0, 16);
        dateView.setUint8(1, 4);
        dateView.setUint8(2, n);
        return buf;
    }
}
exports.EscCommand = EscCommand;
//# sourceMappingURL=esc.js.map
