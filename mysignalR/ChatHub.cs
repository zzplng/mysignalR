using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;

namespace mysignalR
{
	public class ChatHub : Hub
	{
		IMemoryCache _cache;
		string _online = "online";

		public ChatHub(IMemoryCache cache)
		{ 
			_cache = cache;
		}

		public async Task SendMessage(string user, string message)
		{
			// 调用所有客户端的接收消息的方法
			await Clients.All.SendAsync("ReceiveMessage", user, message);
		}

        public override Task OnConnectedAsync()
        {
			if (_cache.Get(_online) != null)
			{
				var online = (int)_cache.Get(_online);
				online++;
				_cache.Set(_online, online);
			}
			else
            {
                _cache.Set(_online, 1);
            }
            return Task.CompletedTask;
        }

        public override Task OnDisconnectedAsync(Exception ex)
        {
            var online = (int)_cache.Get(_online);
            if(online > 1) online--;
            _cache.Set(_online, online);
            return Task.CompletedTask;
        }
    }
}
