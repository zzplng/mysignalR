using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace mysignalR
{
	public class ChatHub : Hub
	{
		public async Task SendMessage(string user, string message)
		{
			// 调用所有客户端的接收消息的方法
			await Clients.All.SendAsync("ReceiveMessage", user, message);
		}

    }
}
