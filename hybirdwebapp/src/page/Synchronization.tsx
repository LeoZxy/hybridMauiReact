import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

export default function Synchronization() {
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  // 定义一个全局函数，供原生代码回调
  useEffect(() => {
    // 挂载全局回调函数
    (window as any).handleSynchronizationResult = (result: any) => {
      setLoading(false);
      setResultData(result);
    };

    // 清理函数
    return () => {
      delete (window as any).handleSynchronizationResult;
    };
  }, []);

  const triggerSynchronization = () => {
    setLoading(true);
    
    console.log('(window as any).webkit', window);

    // 调用原生方法
    if ((window as any).webkit && (window as any).webkit.messageHandlers) {
      // iOS WebView 调用
      (window as any).webkit.messageHandlers.synchronize.postMessage('start');
    } else if ((window as any).Android) {
      // Android WebView 调用
      (window as any).Android.synchronize();
    } else {
      // 桌面端 MAUI WebView 调用
      (window as any).chrome.webview.postMessage('synchronize');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Button 
        variant="contained" 
        onClick={triggerSynchronization} 
        disabled={loading}
      >
        '开始同步'
        {/* {loading ? <CircularProgress size={24} /> : '开始同步'} */}
      </Button>


      {resultData && (
        <Dialog open={!!resultData} onClose={() => setResultData(null)}>
          <DialogTitle>同步结果</DialogTitle>
          <DialogContent>
            <pre>{JSON.stringify(resultData, null, 2)}</pre>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
