namespace HybridSample;

public partial class MainPage : ContentPage
{
    private WebView webView;

    public MainPage()
    {
        InitializeComponent();

        webView = new WebView
        {
            Source = new UrlWebViewSource
            {
                Url = "http://localhost:3000"
            },
            VerticalOptions = LayoutOptions.FillAndExpand
        };

        // 注册 JavaScript 消息处理
        webView.Navigated += OnWebViewNavigated;

        Content = webView;
    }

    private void OnWebViewNavigated(object sender, WebNavigatedEventArgs e)
    {
        // 注入 JavaScript 桥接代码
        webView.Eval(@"
            window.chrome = window.chrome || {};
            window.chrome.webview = {
                postMessage: function(message) {
                    window.synchronize = message;
                }
            };
        ");
    }

    // 处理同步请求的方法
    private async void HandleSynchronization()
    {
        try
        {
            // 执行网络请求
            var client = new HttpClient();
            var response = await client.GetAsync("你的API地址");
            var jsonResult = await response.Content.ReadAsStringAsync();

           
        }
        catch (Exception ex)
        {
          
        }
    }
}



