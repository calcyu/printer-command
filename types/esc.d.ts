export declare class EscCommand {
    private textEncoder;
    private data;
    private readonly bar;
    constructor(textEncoder: { encode(content: string): Uint8Array });
    /**
     * ESC @ 初始化打印机
     * 清除打印缓冲区数据，打印模式被设为上电时的默认值模式
     */
    init(): this;
    /**
     *LF 打印并换行
     *将打印缓冲区中的数据打印出来，并且按照当前行间距，把打印纸向前推进一行。
     */
    setPrint(): this;
    /**
     * ESC J 打印并走纸n 个单位
     * 打印缓冲区数据并走纸[n × 纵向或横向移动单位]英寸。
     */
    setPrintAndFeed(n: number): this;
    /**
     * ESC d 打印并走纸n 行
     * 打印缓冲区里的数据并向前走纸n 行（字符行）
     */
    setPrintAndFeedRow(n: number): this;
    /**
     * HT 水平定位
     *移动打印位置到下一个水平定位点的位置
     */
    setHorTab(): this;
    /**
     * ESC $ 设置绝对打印位置
     * 将当前位置设置到距离行首（nL + nH × 256）×（横向或纵向移动单位）处。
     * 传入参数为点数
     * 1mm=8dot
     */
    setAbsolutePrintPosition(where: number): this;
    /**
     * ESC \ 设置相对横向打印位置
     * 以横向或纵向移动单位设置横向相对位移
     * 传入参数为点数
     * 1mm=8dot
     */
    setRelativePrintPositon(where: number): this;
    /**
     * ESC a 选择对齐方式
     * 使所有的打印数据按某一指定对齐方式排列。
     * n 的取值与对齐方式对应关系如下
     * • 当n 为0 时 ： 左对齐
     * • 当n 为1 时 ： 中间对齐
     * • 当n 为2 时  右对齐
     */
    setSelectJustification(which: number): this;
    /**
     * GS L 设置左边距
     * 传入参数为点数
     * 1mm=8dot
     */
    setLeftMargin(n: number): this;
    /**
     * GS W 设置打印区域宽度
     * 传入参数为点数
     * 1mm=8dot
     */
    setPrintingAreaWidth(width: number): this;
    /**
     * GS P 设置横向和纵向移动单位
     * 传入参数为点数
     * 1mm=8dot
     */
    setHorizontalAndVertical(x: number, y: number): this;
    /**
   * DLE DC4 实时产生钱箱开启脉冲
   * 在指定的钱箱插座引脚产生设定的开启脉冲，引脚由m 指定：
     m 连接引脚
     0 钱箱插座引脚2
     1 钱箱插座引脚5
   * 脉冲高电平时间为[t × 100 ms]，低电平的时间为[t × 100 ms]
   */
    setCashboxPulse(n: number, m: number, t: number): this;
    /**
     * ESC c 3 选择打印纸传感器以输出缺纸信号
     * 传入参数说明
     * • 当n 为0 时：关闭纸将尽传感器
     * • 当n 为1 时：开启纸将尽传感器
     * • 当n 为2 时：开启纸将尽传感器
     * • 当n 为3 时：开启纸尽传感器
     * • 当n 为4 时：开启纸尽传感器
     */
    setPrintPageSignal(n: number): this;
    /**
     * ESC c 4 选择打印纸传感器以停止打印
     * 传入参数说明
     * • 当n 为0 时：禁止纸将尽传感器
     * • 当n 为1 时：允许纸将尽传感器
     * • 当n 为2 时：允许纸将尽传感器
     */
    setSensorToStopPrint(n: number): this;
    /**
     * ESC c 5 允许/禁止按键
     * 允许/禁止按键
     * 传入参数说明
     * • 当n 为0 时，按键起作用。
     * • 当n 为1 时，按键被禁止。
     */
    setSelectKey(n: number): this;
    /**
     * ESC p 产生钱箱控制脉冲
     * 输出由t1 和t2 设定的钱箱开启脉冲到由m 指定的引脚：
     * 传入参数说明
     * • 当m 为0 时，钱箱插座的引脚2
     * • 当m 为1 时，钱箱插座的引脚5
     */
    setCashCashboxPulse(m: number, t1: number, t2: number): this;
    /**
     * ESC = 选择打印机
     * 选择打印机，被选择的打印机可以接收主计算机发送的数据
     * 传入参数说明
     * • 当n 为0 时，打印机禁止
     * • 当n 为1 时，打印机允许。
     */
    setSelectPrinter(n: number): this;
    /**
     * ESC 2 设置默认行间距
     *选择默认行间距
     */
    setDefaultLineSpace(): this;
    /**
     * ESC 3 设置行间距
     * 传入参数为点数
     * 1mm=8dot
     */
    setLineSpace(n: number): this;
    /**
     * ESC SP 设置字符右间距
     * 传入参数为点数
     * 1mm=8dot
     */
    setCharacterRightSpace(n: number): this;
    /**
     * ESC ! 选择打印模式
     * 传入参数说明
     * 根据n 的值设置字符打印模式
     */
    setPrintMode(mode: number): void;
    /**
     * ESC % 选择/取消用户自定义字符
     * • 当n 为0 时，不使用用户自定义字符。
     * • 当n 为1 时，使用用户自定义字符。
     */
    setUserDefinitionCharacter(n: number): this;
    /**
     * ESC – 选择/取消下划线模式
     * 传入参数说明
     * • 当n 为0 时：取消下划线模式
     * • 当n 为1 时：选择下划线模式（1 点宽）
     * • 当n 为2 时：选择下划线模式（2 点宽）
     */
    setUnderlineMode(n: number): this;
    /**
     * ESC ? 取消用户自定义字符
     * 传入参数说明
     * 取消用户自定义字符中代码为n 的字符。取消后，此字符使用内部字库
     */
    setCancleUserDefinitionCharacter(n: number): this;
    /**
     * ESC E 选择/取消加粗模式
     * 传入参数说明
     * 当n 为0 时，取消加粗模式。
     * 当n 为1 时，选择加粗模式。
     */
    setBoldMode(n: number): this;
    /**
     * ESC G 选择/取消双重打印模式
     *传入参数说明
     *• 当n 位为0 时，取消双重打印模式。
     *• 当n 位为1 时，选择双重打印模式。
     */
    setDoublePrintMode(n: number): this;
    /**
     * ESC M 选择字体
     * 传入参数说明
     * • 当n 位为0 时， 选择标准ASCII 码字体(12 × 24)
     * • 当n 位为1 时， 选择压缩ASCII 码字体(9 × 17))
     */
    setSelectFont(n: number): this;
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
    setInternationalCharacters(n: number): this;
    /**
     * ESC V 选择/取消顺时针旋转90 度
     * 传入参数说明
     * • 当n 位为0 时， 取消顺时针旋转90 度模式
     * • 当n 位为1 时，选择顺时针旋转90 度模式
     */
    setRotate90(n: number): this;
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
    setCodePage(n: number): this;
    /**
     * ESC { 选择/取消倒置打印模式
     * 传入参数说明
     * • 当n 位为0 时， 选择PC437 [美国，欧洲标准]（默认）
     * • 当n 位为1 时， 选择日文片假名
     */
    setInvertPrintMode(n: number): this;
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
    setCharacterSize(n: number): this;
    /**
     * GS B 选择/取消黑白反显打印模式
     * 传入参数说明
     * • 当n 位为0 时，取消反显打印
     * • 当n 位为1 时，选择反显打印
     */
    setReverseMode(n: number): this;
    private convertToSingleBitmap;
    /**
     * GS v 0 打印光栅位图
     *
     */
    setBitmap(res: { width: number; height: number; data: [] }): this;
    /**
     * GS H 选择HRI 字符的打印位置
     * 传入参数说明
     * • 当n 位为0 时，不打印
     * • 当n 位为1 时，条码上方
     * • 当n 位为2 时，条码下方
     * • 当n 位为3 时，条码上、下方
     */
    setHRIPosition(position: number): this;
    /**
     * GS f 选择HRI 使用字体
     * 传入参数说明
     * • 当n 位为0 时，标准ASCII 码字符(12 × 24)
     * • 当n 位为1 时，压缩ASCII 码字符(9 × 17)
     */
    setHRIFont(font: number): this;
    /**
     * GS h 选择条码高度
     * 传入参数说明
     * 2 ≤ n ≤ 6
     */
    setBarcodeWidth(width: number): this;
    /**
     * GS h 选择条码高度
     * 传入参数说明
     * 1 ≤ n ≤ 255
     */
    setBarcodeHeight(height: number): this;
    /**
     * 打印条码128类型
     */
    setCode128(content: string): this;
    /**
     * 打印条码
     * 传入参数说明
     * t:条码类型
     * content：内容
     */
    setBarcodeContent(t: string, content: number): this;
    /**
     * FS ! 设置汉字字符模式
     * 传入参数说明
     * • 当n 位为0 时，取消倍宽、倍高、取消下划线
     * • 当n 位为4 时，选择倍宽
     * • 当n 位为8 时，选择倍高
     * • 当n 位为128 时，选择下划线
     */
    setChineseCharacterMode(n: number): this;
    /**
     * FS & 选择汉字模式
     */
    setSelectChineseCharacter(): this;
    /**
     * FS . 取消汉字模式
     */
    setCancelChineseCharacter(): this;
    /**
     * FS - 选择/取消汉字下划线模式
     * 传入参数说明
     * • 当n 位为0 时，取消汉字下划线
     * • 当n 位为1 时，选择汉字下划线（1 点宽）
     * • 当n 位为2 时，选择汉字下划线（2 点宽）
     */
    setCancelUnderLine(n: number): this;
    /**
     * FS S 设置汉字字符左右间距
     * 传入参数说明
     * 分别将汉字的左间距和右间距设置为n1 和n2
     * 传入点数，1mm=8dot
     */
    setChineseCharacterSpace(n1: number, n2: number): this;
    /**
     * FS W 选择/取消汉字倍高倍宽
     * • 当n 的最低位为0，取消汉字倍高倍宽模式。
     * • 当n 的最低位为1，选择汉字倍高倍宽模式。
     */
    setChineseCharacteHeightWidth(n: number): this;
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
    setBlackMaskOffset(p: number, a: number, m: number, n: number): this;
    /**
     * GS FF 设置黑标至打印起始位置
     */
    setBlackMarkStart(): this;
    /**
     * GS V 选择切纸模式并切纸
     * 半切
     */
    setCutter(): this;
    /**
     * GS V 选择切纸模式并切纸
     * 传入参数说明
     * 传入点数，1mm=8dot
     * 进纸n 并且半切纸
     */
    setCut(n: number): this;
    /**
     * ESC B 打印机来单打印蜂鸣提示
     * 传入参数说明
     * 1 ≤ n ≤ 9
     * 1 ≤ t ≤ 9
     * n 是指蜂鸣器鸣叫次数。
     * t 是指蜂鸣器鸣每次数鸣叫时间为(t × 50) ms
     */
    setSound(n: number, t: number): this;
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
    setOrderTip(m: number, t: number, n: number): this;
    /**
     * 设置QRCode 模块大小为n dot
     * 传入参数说明
     * 1 ≤ n ≤ 15
     * [默认值] n = 3
     */
    setSelectSizeOfModuleForQRCode(n: number): this;
    /**
     * 选择QRCode 纠错等级
     * 传入参数说明
     * n      功能        纠错能力
     * 48    选择纠错等级  L 7
     * 49    选择纠错等级  M 15
     * 50    选择纠错等级  Q 25
     * 51    选择纠错等级  H 30
     */
    setSelectErrorCorrectionLevelForQRCode(n: number): this;
    /**
     * 存储QRCode 数据(d1...dk)到符号存储区
     */
    setStoreQRCodeData(content: string): this;
    /**
     * 打印QRCode 条码
     */
    setPrintQRCode(): this;
    /**
     * 设置GB18030编码格式文字
     */
    setText(content: string): this;
    /**
     * 添加用户自定义指令
     */
    setUserCommand(content: number): this;
    getData(): number[];
    clearData(): this;
    getRealtimeStatusTransmission(n: number): ArrayBuffer;
}
