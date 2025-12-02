/**
 * 统一的状态栏组件
 * 包含时间、信号、Wi-Fi、电池图标
 */
export default function StatusBar() {
  return (
    <div className="h-11 flex items-center justify-between px-4 bg-white relative z-10">
      <div className="text-[15px] font-semibold">9:41</div>
      <div className="flex items-center gap-1.5">
        {/* 信号图标 */}
        <div 
          className="w-[15.33px] h-[11px]"
          style={{
            backgroundImage: `url(http://localhost:3667/assets/Boolean_operation_8_758.png)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        {/* Wi-Fi图标 */}
        <div 
          className="w-[17px] h-[10.67px]"
          style={{
            backgroundImage: `url(http://localhost:3667/assets/Boolean_operation_8_762.png)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        {/* 电池图标 */}
        <div className="relative w-[24.33px] h-[11.33px]">
          <div 
            className="absolute right-[2.33px] top-0 w-[22px] h-[11.33px] rounded-[2.67px] border border-black/35"
          ></div>
          <div 
            className="absolute right-0 top-[3.67px] w-[1.33px] h-[4px]"
            style={{
              backgroundImage: `url(http://localhost:3667/assets/Vector_8_756.png)`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div className="absolute right-[4.33px] top-[2px] w-[18px] h-[7.33px] rounded-[1.33px] bg-black"></div>
        </div>
      </div>
    </div>
  );
}

